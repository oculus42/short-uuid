/**
 * Created by Samuel on 6/4/2016.
 * Simple wrapper functions to produce shorter UUIDs for cookies, maybe everything?
 */

var anyBase = require('any-base');
var uuidV4 = require('uuid/v4');

var flickrBase58 = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
var cookieBase90 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~";

var toFlickr;

/**
 * Takes a UUID, strips the dashes, and translates.
 * @param {string} longId
 * @param {function(string)} translator
 * @returns {string}
 */
function shortenUUID (longId, translator) {
    return translator(longId.toLowerCase().replace(/-/g,''));
}

/**
 * Translate back to hex and turn back into UUID format, with dashes
 * @param {string} shortId
 * @param {function(string)} translator
 * @returns {string}
 */
function enlargeUUID(shortId, translator) {
    var uu1 = translator(shortId);
    var leftPad = "";
    var m;

    // Pad out UUIDs beginning with zeros (any number shorter than 32 characters of hex)
    for (var i = 0, len = 32-uu1.length; i < len; ++i) {
        leftPad += "0";
    }

    // Join the zero padding and the UUID and then slice it up with match
    m = (leftPad + uu1).match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/);

    // Accumulate the matches and join them.
    return [m[1], m[2], m[3], m[4], m[5]].join('-');
}

module.exports = (function(){

    /**
     * @constructor
     * @param {string?} toAlphabet - Defaults to flickrBase58 if not provided
     * @returns {{new: (function()),
     *  uuid: (function()),
     *  fromUUID: (function(string)),
     *  toUUID: (function(string)),
     *  alphabet: (string)}}
     */
    function MakeConvertor(toAlphabet) {

        // Default to Flickr 58
        var useAlphabet = toAlphabet || flickrBase58;

        // UUIDs are in hex, so we translate to and from.
        var fromHex = anyBase(anyBase.HEX, useAlphabet);
        var toHex = anyBase(useAlphabet, anyBase.HEX);
        var generate = function() { return shortenUUID(uuidV4(), fromHex); };

        return {
            new: generate,
            generate: generate,
            uuid: uuidV4,
            fromUUID: function(uuid) { return shortenUUID(uuid, fromHex); },
            toUUID: function(shortUuid) { return enlargeUUID(shortUuid, toHex); },
            alphabet: useAlphabet
        };
    }

    // Expose the constants for other purposes.
    MakeConvertor.constants = {
        flickrBase58: flickrBase58,
        cookieBase90: cookieBase90
    };

    // Expose the generic v4 UUID generator for convenience
    MakeConvertor.uuid = uuidV4;

    // Provide a generic generator
    MakeConvertor.generate = function() {
        if (!toFlickr) {
            // Generate on first use;
            toFlickr = anyBase(anyBase.HEX, flickrBase58);
        }
        return shortenUUID(uuidV4(), toFlickr);
    };

    return MakeConvertor;
}());
