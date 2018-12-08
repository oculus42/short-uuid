# Revisions

# v3.1.0

### Quick Start

```javascript
var short = require('short-uuid');

// Quick start with flickrBase58 format
short.generate(); // 73WakrfVbNJBaAmhQtEeDv
```

### Details

short-uuid starts with RFC4122 v4-compliant UUIDs and translates them
into other, usually shorter formats. It also provides translators
to convert back and forth from RFC complaint UUIDs to the shorter formats.

```javascript
var short = require('short-uuid');

var translator = short(); // Defaults to flickrBase58                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
var decimalTranslator = short("0123456789"); // Provide a specific alphabet for translation
var cookieTranslator = short(short.constants.cookieBase90); // Use a constant for translation

// Generate a shortened v4 UUID
translator.new(); // mhvXdrZT4jP5T8vBxuvm75
translator.generate(); // An alias for new.

// Translate UUIDs to and from the shortened format
translator.toUUID(shortId);// a44521d0-0fb8-4ade-8002-3385545c3318
translator.fromUUID(regularUUID); // mhvXdrZT4jP5T8vBxuvm75

// Generate plain UUIDs
// - From the library without creating a translator
short.uuid(); // fd5c084c-ff7c-4651-9a52-37096242d81c
// - Each translator provides the uuid.v4() function, too
translator.uuid(); // 3023b0f5-ec55-4e75-9cd8-104700698052

// See the alphabet used by a translator
translator.alphabet;

// View the constants
short.constants.flickrBase58; // Avoids similar characters (0/O, 1/I/l, etc.)
short.constants.cookieBase90; // Safe for HTTP cookies values for smaller IDs. 
```

## Notes

short-uuid provides RFC4122 v4-compliant UUIDs,
thanks to [`uuid`](https://github.com/kelektiv/node-uuid).

It includes Browserify support for client-side use as proposed
by [voronianski](https://github.com/voronianski), with compiled,
browser-ready files in the npm package for convenience.
The library is exposed as `ShortUUID`.

TypeScript definitions are included, thanks to
[alexturek](https://github.com/alexturek).

short-uuid is under 1.2K when compressed. Using Browserify, the library and dependencies are ~3.6K.

## Recent Release Notes

3.1.0 adds `generate()` for ease of use.  
3.0.0 updates dependencies, includes a refactor for CodeClimate, and drops Node 0.x support.  
2.3.4 corrects the behavior for UUIDs with uppercase letters. Last version to build on Node 0.x.  


# v3.0.0

3.0.0 updates dependencies, includes a refactor for CodeClimate, and drops Node 0.x support.

3.0.0 drops build support for Node 0.10 and 0.12, as nested dependencies were updated and breaks the build.
There are no functional changes in 3.0.0 from 2.3.4.

TypeScript definitions are included, thanks to [alexturek](https://github.com/alexturek).

# v2.3.4

2.3.4 corrects the behavior for UUIDs with uppercase letters.

**Prior to 2.3.4, passing a UUID with capital letters would cause an incorrect conversion.**  
All UUIDs are now converted to lowercase before translation.  
UUIDs generated by the `uuid` library were always lowercase. This was a test case miss.  

# v2.3.3

2.3.3 fixes missing /dist folder from the npm module.

# v2.3.2

2.3.2 merges a TypeScript definition from [alexturek](https://github.com/alexturek).

# v2.3.1

2.3.1 merges the version history of the 2.1.x branch updates.

# v2.3.0

2.3.0 moves Snyk to a dev dependency.
2.2.0 incorrectly added Snyk as a production dependency. It has been deprecated.

# v2.2.0 - DEPRECATED

2.2.0 updates dev dependencies and adds Snyk vulnerability monitoring and patching.

# v2.1.4

2.1.0 adds Browserify config to support client-side use as proposed by [voronianski](https://github.com/voronianski).
2.1.1 includes compiled browser-ready files in the npm package for convenience. The library is exposed as `ShortUUID`.
2.1.2 switches to the modular `uuid` library.
2.1.3 fixes a bad npm package for 2.1.1 which included Snyk incorrectly.
2.1.4 corrects documentation of 2.1.2 from unpublished to deprecated.

## v2.1.2 Deprecated

An incorrect package.json was packaged in v2.1.2, causing Snyk to be listed as a dependency. 
This was introduced in v2.2.0.

# v2.1.3

2.1.3 corrects a bad package.json in the 2.1.2 npm package.

# v2.1.2 - DEPRECATED

2.1.2 changes to `uuid` 3.0.0 and uses only the `uuid/v4` module.

# v2.1.2

2.1.2 changes to `uuid` 3.0.0 and uses only the `uuid/v4` module.

# v2.1.1

2.1.1 includes the compiled Browserify files in the npm package for convenience.

# v2.1.0

2.1 provides [Browserify](http://browserify.org) support as proposed by [voronianski](https://github.com/voronianski),
exposing the interface at `ShortUUID`.

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
