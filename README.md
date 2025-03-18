# short-uuid

[![npm](https://img.shields.io/npm/v/short-uuid.svg)](https://www.npmjs.com/package/short-uuid)
[![Code Climate](https://codeclimate.com/github/oculus42/short-uuid/badges/gpa.svg)](https://codeclimate.com/github/oculus42/short-uuid)
[![Test Coverage](https://codeclimate.com/github/oculus42/short-uuid/badges/coverage.svg)](https://codeclimate.com/github/oculus42/short-uuid/coverage)

Generate and translate standard UUIDs into shorter - or just *different* - formats and back.

### Quick Start

```javascript
const short = require('short-uuid');

// Quick start with flickrBase58 format
short.generate(); // '73WakrfVbNJBaAmhQtEeDv'

// Provide a different alphabet for translation
const translator = short.createTranslator('0123456789abcdef');
translator.generate(); // '2b82f84eb5704ccfb6165f367e6a253f'

// Provide an alternative uuid generator and alphabet
const translator2 = short.createTranslator({
  alphabet: short.constants.rfcBase32,
  uuid: uuidv7,
});
translator2.generate(); 'ABSWTKE25PPJT2W3E6OF4J375N'
```

## v6.0.0
- Uses [`crypto.randomUUID`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) by default.
- Accepts alternative UUID generators such as [uuidv7](https://www.npmjs.com/package/uuidv7)
- Converted to TypeScript

## Major Changes in v6.0.0
- 🛑 Removes the uuid library as a dependency.
- 🛑 Removes the `new` method in favor of `generate`.
- 🛑 Removes the `uuid` method on the default export.
- 🛑 Removes createTranslator as default export.
- ⚠️ Node 18 and lower may require passing a `uuid` generator to the translator.
- 🛑 The default `generate` method assumes crypto.randomUUID is available and may error prior to Node 18.

### Details

short-uuid starts with RFC4122 v4-compliant UUIDs and translates them
into other, usually shorter formats. It also provides translators
to convert back and forth from RFC compliant UUIDs to the shorter formats,
and validate the IDs.

By default, shortened values are padded for consistent length. This can be disabled.

As of 6.0.0, short-uuid uses the native `crypto.randomUUID` method to generate UUIDs.
It can also accept alternative UUID generators, such as [uuidv7](https://www.npmjs.com/package/uuidv7).
Node 14.17.0 and later support `crypto.randomUUID`, but may require passing the UUID generator to the translator.

```javascript
const short = require('short-uuid');

// Generate a flickrBase58 short ID from without creating a translator
// This may not work prior to Node 18
const shortId = short.generate();

const translator = short.createTranslator(); // Defaults to flickrBase58
const decimalTranslator = short.createTranslator("0123456789"); // Provide a specific alphabet for translation
const cookieTranslator = short.createTranslator(short.constants.cookieBase90); // Use a constant for translation

// Generate a shortened UUID with the built-in translator
translator.generate(); // mhvXdrZT4jP5T8vBxuvm75

// Translate UUIDs to and from the shortened format
const regularUUID = translator.toUUID(shortId); // a44521d0-0fb8-4ade-8002-3385545c3318
translator.fromUUID(regularUUID); // mhvXdrZT4jP5T8vBxuvm75

// Check if a string is a valid short ID (length and alphabet)
translator.validate(shortId); // true

// Check if a string is valid *AND* translates to a valid UUID
translator.validate(shortId, true); // true
translator.validate('0000000000000000000000', true) // false

// See the alphabet used by a translator
translator.alphabet;

// The maximum length a translated uuid will be with its alphabet.
// if consistentLength is set (on by default), so ids will be this length.
translator.maxLength;

// View the constants
short.constants.cookieBase90; // Safe for HTTP cookies values for smaller IDs.
short.constants.flickrBase58; // Avoids similar characters (0/O, 1/I/l, etc.)
short.constants.uuid25Base36; // The uuid25 (string length 25) format
short.constants.rfcBase32;    // The RFC 4648 Base32 format

// Generate plain UUID - Each translator provides its uuid function.
translator.uuid(); // 3023b0f5-ec55-4e75-9cd8-104700698052
```

### Options

The `createTranslator` method supports several arguments:

```javascript
short.createTranslator(alphabet);
short.createTranslator(alphabet, options);
short.createTranslator(options);
```

* `alphabet` - The alphabet to use for translation. Defaults to `short.constants.flickrBase58`.
* `consistentLength` - Controls padding on shortened values. Default is `true`.
* `uuid` - A function that generates a UUID. Defaults to `crypto.randomUUID`.

```javascript
const short = require('short-uuid');

// By default shortened values are now padded for consistent length.
// If you want to produce variable lengths, like in 3.1.1
const translator = short.createTranslator(short.constants.flickrBase58, {
  consistentLength: false,
});

// Generate a shortened v4 UUID
translator.generate(); // mhvXdrZT4jP5T8vBxuvm75
```

## Support

short-uuid [6.x](https://github.com/oculus42/short-uuid/blob/v6.0.0/README.md)
and later is tested on Node 14.17.x and later.

## Notes

TypeScript definitions are included, thanks to
[alexturek](https://github.com/alexturek).

Please see [Releases](https://github.com/oculus42/short-uuid/releases) for information on previous versions.
