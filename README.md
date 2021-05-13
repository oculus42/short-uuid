# short-uuid

[![npm](https://img.shields.io/npm/v/short-uuid.svg)](https://www.npmjs.com/package/short-uuid)
[![Build Status](https://travis-ci.org/oculus42/short-uuid.svg?branch=master)](https://travis-ci.org/oculus42/short-uuid)
[![Code Climate](https://codeclimate.com/github/oculus42/short-uuid/badges/gpa.svg)](https://codeclimate.com/github/oculus42/short-uuid)
[![Test Coverage](https://codeclimate.com/github/oculus42/short-uuid/badges/coverage.svg)](https://codeclimate.com/github/oculus42/short-uuid/coverage)
[![Dependencies](https://david-dm.org/oculus42/short-uuid.svg)](https://david-dm.org/oculus42/short-uuid)
[![Known Vulnerabilities](https://snyk.io/test/github/oculus42/short-uuid/badge.svg)](https://snyk.io/test/github/oculus42/short-uuid)

Generate and translate standard UUIDs into shorter - or just *different* - formats and back.

## v4.2.0

### Major Changes in 4.0.0

- 🛑 short-uuid will now throw an error when provided an alphabet with duplicate characters. Duplicate characters will cause translation errors.
- ℹ️ 4.0.0 is written in modern ECMAScript. It uses features through ES9/ES2018.
- ℹ️ By default, short-uuid will pad shortened IDs to a consistent length.
  - Padding does not affect translation, and the values are compatible with previous releases.
  - Padding can be disabled with the option `consistentLength: false` when instantiating a translator. This is consistent with previous versions.
- ℹ️ 4.x does not include a pre-built version for browsers. If needed, 3.1.1 is compatible, but does not pad to a consistent length.


### Quick Start

```javascript
const short = require('short-uuid');

// Quick start with flickrBase58 format
short.generate(); // 73WakrfVbNJBaAmhQtEeDv
```

### Details

short-uuid starts with RFC4122 v4-compliant UUIDs and translates them
into other, usually shorter formats. It also provides translators
to convert back and forth from RFC compliant UUIDs to the shorter formats.

As of 4.0.0, formats return consistent-length values unless specifically requested.
This is done by padding the start with the first (`[0]`) character in the alphabet.
Previous versions can translate padded formats back to UUID.

```javascript
const short = require('short-uuid');

const translator = short(); // Defaults to flickrBase58
const decimalTranslator = short("0123456789"); // Provide a specific alphabet for translation
const cookieTranslator = short(short.constants.cookieBase90); // Use a constant for translation

// Generate a shortened v4 UUID
translator.new(); // mhvXdrZT4jP5T8vBxuvm75
translator.generate(); // An alias for new.

// Translate UUIDs to and from the shortened format
translator.toUUID(shortId); // a44521d0-0fb8-4ade-8002-3385545c3318
translator.fromUUID(regularUUID); // mhvXdrZT4jP5T8vBxuvm75

// Generate plain UUIDs
// - From the library without creating a translator
short.uuid(); // fd5c084c-ff7c-4651-9a52-37096242d81c
// - Each translator provides the uuid.v4() function, too
translator.uuid(); // 3023b0f5-ec55-4e75-9cd8-104700698052

// See the alphabet used by a translator
translator.alphabet;

// The maximum length a translated uuid will be with its alphabet.
translator.maxLength;

// View the constants
short.constants.flickrBase58; // Avoids similar characters (0/O, 1/I/l, etc.)
short.constants.cookieBase90; // Safe for HTTP cookies values for smaller IDs.
```

### Options

short-uuid 4.0.0 adds support for options when creating a translator.
This will support additional configuration in the future.

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

short-uuid 4.0.0 and later is confirmed to work on Node 8.x and later.
- Pre-compiled browser version is planned for future release.

short-uuid [3.1.1](https://github.com/oculus42/short-uuid/blob/v3.1.1/README.md)
and lower is confirmed to work on Node 0.10.x and later,
and browsers with a precompiled library proposed
by [voronianski](https://github.com/voronianski).

## Notes

short-uuid provides RFC4122 v4-compliant UUIDs,
thanks to [`uuid`](https://github.com/uuidjs/uuid).

TypeScript definitions are included, thanks to
[alexturek](https://github.com/alexturek).

## Recent Release Notes
4.1.0 adds a maxLength value to translators for reference
4.0.3 fixes default generate
4.0.1 adds consistent length translation and throws an error if provided an invalid alphabet.
3.1.1 updated dev dependencies which required dropping Node 4.x build test. Last Browserify distribution version temporarily.
2.3.4 corrects the behavior for UUIDs with uppercase letters. Last version to build on Node 0.x.

Please see [Revisions](revisions.md) for information on previous versions.
