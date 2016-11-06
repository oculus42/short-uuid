# Revisions

# v2.0.0

2.0 is a major rework to make the library more capable and useful. It now provides RFC4122 v4-compliant UUIDs,
thanks to [`node-uuid`](https://github.com/broofa/node-uuid).

```javascript
var short = require('short-uuid');
var translator = short(); // Defaults to flickrBase58
var decimalTranslator = short("0123456789"); // Provide a specific alphabet for translation
var cookieTranslator = short(short.constants.cookieBase90); // Use a constant for translation

// Generate a shortened v4 UUID
translator.new();

// Generate plain UUIDs
short.uuid(); // From the constructor without creating a translator
translator.uuid(); // Each translator provides the uuid.v4() function

// Translate UUIDs
translator.toUUID(shortId);
translator.fromUUID(regularUUID);

// See the alphabet used by a translator
translator.alphabet

// View the constants
short.constants.flickrBase58;
short.constants.cookieBase90;

```

# v1.0.0

Translate standard UUIDs into shorter formats and back.

`require('short-uuid')` returns an object with a "new" function that takes a base as a parameter and returns to/from functions:

    {
      fromUUID: function(){..},
      toUUID: function(){..}
      fromHex: function(){..},
      toHex: function(){..},
    }

The 'UUID' Functions handle the dashes and left-filled zeros needed for proper UUID support. The 'Hex' functions provide the translation functions from `any-base`.

The object also incldues a `constants` object, with base58 and base90 sets.
The base58 set `flickrBase58` originates with Flickr and reduces human transcription errors.
The base90 set `cookieBase90` is the set of allowable characters in a cookie value, and is intended to provide the shortest storage of UUIDs in a browser cookie.

Finally, the Base58 translator is automatically generated and included as `b58` for convenience.
