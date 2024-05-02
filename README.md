# short-uuid

[![npm](https://img.shields.io/npm/v/short-uuid.svg)](https://www.npmjs.com/package/short-uuid)
[![Code Climate](https://codeclimate.com/github/oculus42/short-uuid/badges/gpa.svg)](https://codeclimate.com/github/oculus42/short-uuid)
[![Test Coverage](https://codeclimate.com/github/oculus42/short-uuid/badges/coverage.svg)](https://codeclimate.com/github/oculus42/short-uuid/coverage)

Generate and translate standard UUIDs into shorter - or just *different* - formats and back.

## v5.2.0
5.2.0 adds `validate` method to check short IDs. Requested by [@U-4-E-A](https://github.com/U-4-E-A)
5.1.0 adds translation support for the [uuid25](https://github.com/uuid25/javascript) (Base36) format
with the `uuid25Base36` constant.

### Major Changes in 5.0.0
- 🛑 5.0.0 drops support for Node 10 and 12.

### Quick Start

```javascript
const short = require('short-uuid');

// Quick start with flickrBase58 format
short.generate(); // '73WakrfVbNJBaAmhQtEeDv'
```

### Details

short-uuid starts with RFC4122 v4-compliant UUIDs and translates them
into other, usually shorter formats. It also provides translators
to convert back and forth from RFC compliant UUIDs to the shorter formats,
and validate the IDs.

As of 4.0.0, formats return consistent-length values unless specifically requested.
This is done by padding the start with the first (`[0]`) character in the alphabet.
Previous versions can translate padded formats back to UUID.

```javascript
const short = require('short-uuid');

// Generate a flickrBase58 short ID from without creating a translator
const shortId = short.generate();

const translator = short(); // Defaults to flickrBase58
const decimalTranslator = short("0123456789"); // Provide a specific alphabet for translation
const cookieTranslator = short(short.constants.cookieBase90); // Use a constant for translation

// Generate a shortened v4 UUID
translator.new(); // mhvXdrZT4jP5T8vBxuvm75
translator.generate(); // An alias for new.

// Translate UUIDs to and from the shortened format
translator.toUUID(shortId); // a44521d0-0fb8-4ade-8002-3385545c3318
translator.fromUUID(regularUUID); // mhvXdrZT4jP5T8vBxuvm75

// Check if a string is a valid ID (length and alphabet)
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

// Generate plain UUIDs
// - From the library without creating a translator
short.uuid(); // fd5c084c-ff7c-4651-9a52-37096242d81c
// - Each translator provides the uuid.v4() function, too
translator.uuid(); // 3023b0f5-ec55-4e75-9cd8-104700698052
```

### Options

short-uuid 4.0.0 added support for options when creating a translator.
This may support additional configuration in the future.

```javascript
const short = require('short-uuid');

// By default shortened values are now padded for consistent length.
// If you want to produce variable lengths, like in 3.1.1
const translator = short(short.constants.flickrBase58, {
  consistentLength: false,
});

// Generate a shortened v4 UUID
translator.new(); // mhvXdrZT4jP5T8vBxuvm75
```
* `consistentLength` - Controls padding on shortened values. Default is `true`.

## Support

short-uuid [5.x](https://github.com/oculus42/short-uuid/blob/v5.2.0/README.md)
and later is tested on Node 14.x and later.

short-uuid [4.x](https://github.com/oculus42/short-uuid/blob/v4.2.2/README.md)
was tested on Node 8.x to 18.x

short-uuid [3.x](https://github.com/oculus42/short-uuid/blob/v3.1.1/README.md)
and lower was confirmed to work on Node 6.x to 12.x,
and offered a precompiled browser library proposed
by [voronianski](https://github.com/voronianski).

## Notes

short-uuid provides RFC4122 v4-compliant UUIDs,
thanks to [`uuid`](https://github.com/uuidjs/uuid).

TypeScript definitions are included, thanks to
[alexturek](https://github.com/alexturek).

## Previous Release Note Highlights
5.0.0 drops support for Node 12 and below.
4.1.0 adds a maxLength value to translators for reference
4.0.1 adds consistent length translation and throws an error if provided an invalid alphabet.
3.1.1 removed Node 4.x tests. Last included Browserify distribution.
2.3.4 corrects the behavior for UUIDs with uppercase letters. Last version to build on Node 0.x.

Please see [Revisions](revisions.md) for information on previous versions.
