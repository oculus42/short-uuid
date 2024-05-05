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
  emojiBase41: [
    '🍎', '🍋', '🍊', '🍍', '🍉', '🍌', '🍓', '🍒', '🥝', '🥥', '🍇', '🥑', '🥦', '🥕', '🥒', '🌽', '🍅', '🧅', '🥔', '🌶', '🫑', '🥬', '🍆', '🥩', '🍔', '🌭', '🌮', '🌯', '🥪', '🍕', '🍟', '🥓', '🍿', '🍪', '🍩', '🎂', '🥧', '🍦', '🍫', '🍭', '🍬',
  ],
};

/**
 *
 * @type {{consistentLength: boolean, outputString: boolean, rigorousValidation: boolean}}
 */
const baseOptions = {
  consistentLength: true,
  outputString: true,
  rigorousValidation: true,
};

// A default generator, instantiated only if used.
let defaultTranslator;

/**
 * Switch to interim ASCII alphabet for processing or validation
 * @param {string|array} shortId
 * @param {object} config
 * @returns {*}
 */
const getInterim = (shortId, config) => (Array.isArray(shortId)
  ? shortId.map((char) => config.interim[config.alphabet.indexOf(char)])
  : config.alphabet.reduce((acc, char, index) => acc
    .replaceAll(char, config.interim[index]), shortId));

/**
 * Takes a UUID, strips the dashes, and translates.
 * @param {string} longId
 * @param {function(string):string} translator
 * @param {Object} [config]
 * @returns {string}
 */
const shortenUUID = (longId, translator, config) => {
  // Strip hyphens from the UUID
  let translated = translator(longId.toLowerCase().replace(/-/g, ''));
  const noPadding = !(config?.consistentLength);
  const isArray = Array.isArray(translated);
  // any-base seems to leave empty strings?
  if (isArray) {
    translated = translated.filter((v) => v !== undefined && v !== '');
  }

  // Support array alphabets
  if (config.interim) {
    let output = translated.map((char) => config.alphabet[config.interim.indexOf(char)]);
    // resolve empty elements in the translated array
    if (noPadding) return config.outputString ? output.join('') : output;
    if ((config.shortIdLength - output.length) > 0) {
      output = [
        ...new Array(config.shortIdLength - translated.length)
          .fill(config.paddingCharacter),
        ...output,
      ];
    }
    return config.outputString ? output.join('') : output;
  }

  // End early if no need to
  if (!config || !config.consistentLength) return translated;

  return translated.padStart(
    config.shortIdLength,
    config.paddingCharacter,
  );
};

/**
 * Translate back to hex and turn back into UUID format, with dashes
 * @param {string} shortId
 * @param {function(string)} translator
 * @param {object} config
 * @returns {string}
 */
const enlargeUUID = (shortId, translator, config) => {
  // Process for translation
  const interimId = config.interim
    ? getInterim(shortId, config)
    : shortId;

  const uu1 = translator(interimId).padStart(32, '0');

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

/**
 * Make an interim ASCII alphabet for translating emoji
 *  or any array-based alphabet
 * @param {number} length
 * @returns {string[]}
 */
const makeInterim = (length) => new Array(length).fill('')
  .map((v, i) => String.fromCharCode(174 + i));

/**
 * @param {string|array} toAlphabet
 * @param {{ consistentLength: boolean }} [options]
 * @returns {{
 *  alphabet: string|array,
 *  fromUUID: (function(*): string),
 *  generate: (function(): string),
 *  maxLength: number,
 *  new: (function(): string),
 *  toUUID: (function(*): string),
 *  uuid: ((function(*, *, *): (*))|*),
 *  validate: ((function(*, boolean=false): (boolean))|*)}}
 */
const makeTranslator = (toAlphabet, options) => {
  // Default to Flickr 58
  const alphabet = toAlphabet ?? constants.flickrBase58;

  // Check alphabet for duplicate characters
  if ([...new Set(Array.from(alphabet))].length !== alphabet.length) {
    throw new Error('Alphabet has duplicate characters. This would cause unreliable results.');
  }

  const useInterim = Array.isArray(alphabet);
  // emoji translation is sketchy, so we use an "interim" alphabet
  const interim = useInterim ? makeInterim(alphabet.length) : null;
  const baseAlphabet = interim ?? alphabet;

  // Default to baseOptions
  const config = Object.freeze({
    ...baseOptions,
    ...options,
    alphabet,
    shortIdLength: getShortIdLength(alphabet.length),
    useInterim,
    interim,
    paddingCharacter: alphabet[0],
  });

  // UUIDs are in hex, so we translate to and from.
  const fromHex = anyBase(anyBase.HEX, baseAlphabet);
  const toHex = anyBase(baseAlphabet, anyBase.HEX);
  /**
   * @returns {string} - short id
   */
  const generate = () => shortenUUID(uuidV4(), fromHex, config);

  /**
   * Confirm if string is a valid id. Checks length and alphabet.
   * If the second parameter is true it will translate to standard UUID
   *  and check the result for UUID validity.
   * @param {string|array} shortId - The string to check for validity
   * @param {boolean} [rigorous] - If true, also check for a valid UUID
   * @returns {boolean}
   */
  const validate = (shortId, rigorous) => {
    if (!shortId) return false;
    // emoji may create length errors. Switch to interim ASCII for validation.
    const isArray = Array.isArray(shortId);
    if (!(typeof shortId === 'string' || isArray)) return false;
    const workId = config.interim
      ? getInterim(shortId, config)
      : shortId;
    const useRigorous = rigorous ?? config.rigorousValidation ?? false;
    const isCorrectLength = config.consistentLength
      ? workId.length === config.shortIdLength
      : workId.length <= config.shortIdLength;

    const onlyAlphabet = (isArray ? workId : workId.split(''))
      .every((char) => (config.interim ?? config.alphabet).includes(char));

    if (!useRigorous) return isCorrectLength && onlyAlphabet;
    return isCorrectLength && onlyAlphabet && uuidValidate(enlargeUUID(shortId, toHex, config));
  };

  return Object.freeze({
    alphabet,
    fromUUID: (uuid) => shortenUUID(uuid, fromHex, config),
    config,
    generate,
    maxLength: config.shortIdLength,
    new: generate,
    toUUID: (shortUuid) => enlargeUUID(shortUuid, toHex, config),
    uuid: uuidV4,
    validate,
  });
};

// Expose the constants for other purposes.
makeTranslator.constants = constants;

// Expose the generic v4 UUID generator for convenience
makeTranslator.uuid = uuidV4;

// Provide a generic generator
makeTranslator.generate = () => {
  if (!defaultTranslator) {
    // Generate on first use;
    defaultTranslator = makeTranslator(constants.flickrBase58).generate;
  }
  return defaultTranslator();
};

module.exports = Object.freeze(makeTranslator);
