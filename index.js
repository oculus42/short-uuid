/**
 * Created by Samuel on 6/4/2016.
 * Simple wrapper functions to produce shorter UUIDs for cookies, maybe everything?
 */

const { v4: uuidV4, validate: uuidValidate } = require('uuid');
const anyBase = require('any-base');

const constants = {
  cookieBase90: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~",
  flickrBase58: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
  uuid25Base36: '0123456789abcdefghijklmnopqrstuvwxyz',
};

const baseOptions = {
  consistentLength: true,
};

// A default generator, instantiated only if used.
let toFlickr;

/**
 * Takes a UUID, strips the dashes, and translates.
 * @param {string} longId
 * @param {function(string):string} translator
 * @param {Object} [paddingParams]
 * @returns {string}
 */
const shortenUUID = (longId, translator, paddingParams) => {
  const translated = translator(longId.toLowerCase().replace(/-/g, ''));

  if (!paddingParams || !paddingParams.consistentLength) return translated;

  return translated.padStart(
    paddingParams.shortIdLength,
    paddingParams.paddingChar,
  );
};

/**
 * Translate back to hex and turn back into UUID format, with dashes
 * @param {string} shortId
 * @param {function(string)} translator
 * @returns {string}
 */
const enlargeUUID = (shortId, translator) => {
  const uu1 = translator(shortId).padStart(32, '0');

  // Join the zero padding and the UUID and then slice it up with match
  const m = uu1.match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/);

  // Accumulate the matches and join them.
  return [m[1], m[2], m[3], m[4], m[5]].join('-');
};

/**
 * Calculate length for the shortened ID
 * @param {number} alphabetLength
 * @returns {number}
 */
const getShortIdLength = (alphabetLength) => (
  Math.ceil(Math.log(2 ** 128) / Math.log(alphabetLength)));

module.exports = (() => {
  /**
   * @param {string} toAlphabet
   * @param {{ consistentLength: boolean }} [options]
   * @returns {{
   *  alphabet: string,
   *  fromUUID: (function(*): string),
   *  generate: (function(): string),
   *  maxLength: number,
   *  new: (function(): string),
   *  toUUID: (function(*): string),
   *  uuid: ((function(*, *, *): (*))|*),
   *  validate: ((function(*, boolean=false): (boolean))|*)}}
   */
  const makeConvertor = (toAlphabet, options) => {
    // Default to Flickr 58
    const useAlphabet = toAlphabet || constants.flickrBase58;

    // Default to baseOptions
    const selectedOptions = { ...baseOptions, ...options };

    // Check alphabet for duplicate entries
    if ([...new Set(Array.from(useAlphabet))].length !== useAlphabet.length) {
      throw new Error('The provided Alphabet has duplicate characters resulting in unreliable results');
    }

    const shortIdLength = getShortIdLength(useAlphabet.length);

    // Padding Params
    const paddingParams = {
      shortIdLength,
      consistentLength: selectedOptions.consistentLength,
      paddingChar: useAlphabet[0],
    };

    // UUIDs are in hex, so we translate to and from.
    const fromHex = anyBase(anyBase.HEX, useAlphabet);
    const toHex = anyBase(useAlphabet, anyBase.HEX);
    /**
     * @returns {string} - short id
     */
    const generate = () => shortenUUID(uuidV4(), fromHex, paddingParams);

    /**
     * Confirm if string is a valid id. Checks length and alphabet.
     * If the second parameter is true it will translate to standard UUID
     *  and check the result for UUID validity.
     * @param {string} shortId - The string to check for validity
     * @param {boolean} [rigorous=false] - If true, also check for a valid UUID
     * @returns {boolean}
     */
    const validate = (shortId, rigorous = false) => {
      if (!shortId || typeof shortId !== 'string') return false;
      const isCorrectLength = selectedOptions.consistentLength
        ? shortId.length === shortIdLength
        : shortId.length <= shortIdLength;
      const onlyAlphabet = shortId.split('').every((letter) => useAlphabet.includes(letter));
      if (rigorous === false) return isCorrectLength && onlyAlphabet;
      return isCorrectLength && onlyAlphabet && uuidValidate(enlargeUUID(shortId, toHex));
    };

    const translator = {
      alphabet: useAlphabet,
      fromUUID: (uuid) => shortenUUID(uuid, fromHex, paddingParams),
      maxLength: shortIdLength,
      generate,
      new: generate,
      toUUID: (shortUuid) => enlargeUUID(shortUuid, toHex),
      uuid: uuidV4,
      validate,
    };

    Object.freeze(translator);

    return translator;
  };

  // Expose the constants for other purposes.
  makeConvertor.constants = constants;

  // Expose the generic v4 UUID generator for convenience
  makeConvertor.uuid = uuidV4;

  // Provide a generic generator
  makeConvertor.generate = () => {
    if (!toFlickr) {
      // Generate on first use;
      toFlickr = makeConvertor(constants.flickrBase58).generate;
    }
    return toFlickr();
  };

  return makeConvertor;
})();
