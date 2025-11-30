# short-uuid

[![npm](https://img.shields.io/npm/v/short-uuid.svg)](https://www.npmjs.com/package/short-uuid)
[![Code Climate](https://codeclimate.com/github/oculus42/short-uuid/badges/gpa.svg)](https://codeclimate.com/github/oculus42/short-uuid)
[![Test Coverage](https://codeclimate.com/github/oculus42/short-uuid/badges/coverage.svg)](https://codeclimate.com/github/oculus42/short-uuid/coverage)

Generate and translate standard UUIDs into shorter - or just *different* - formats and back.

### Quick Start

```javascript
import { generate, createTranslator } from 'short-uuid';

// Generate a short, Base58-encoded UUID immediately:
generate(); // fXqde8UM1CJcfYQVjSaS1E

const translator = createTranslator(); // Default is flickrBase58
translator.generate(); // s2J87kzwLTpm6sy7PjTceZ
```

```javascript
const short = require('short-uuid');

// Generate a short, Base58-encoded UUID immediately:
short.generate(); // 73WakrfVbNJBaAmhQtEeDv

// Or create a translator and generate using its method:
const translator = short.createTranslator(); // Default is flickrBase58
translator.generate(); // mhvXdrZT4jP5T8vBxuvm75
```


## v6.0.0
- Uses [`crypto.randomUUID`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) by default.
- Accepts alternative UUID generators such as [uuidv7](https://www.npmjs.com/package/uuidv7)
- Converted to TypeScript

## Major Changes in v6.0.0
- 🛑 Removes the uuid library as a dependency.
- 🛑 Removes the `new` method in favor of existing `generate`.
- 🛑 Removes the `uuid` method on the default export (previously imported from uuid/v4).
- 🛑 Removes `createTranslator` as default export.
- 🛑 The default `generate` method assumes crypto.randomUUID is available and may error prior to Node 18.
- ⚠️ Node 18 and lower may require passing a `uuid` generator to the translator.

### Usage Details

`short-uuid` starts with RFC4122 v4-compliant UUIDs and translates them
into other, usually shorter formats. It also provides translators
to convert back and forth from RFC-compliant UUIDs to the shorter formats,
and validate the IDs.

By default, shortened values are padded for consistent length. This can be disabled.

As of 6.0.0, short-uuid uses the native `crypto.randomUUID` method to generate UUIDs.
It can also accept alternative UUID generators, such as [uuidv7](https://www.npmjs.com/package/uuidv7).
Node 14.17.0 and later support `crypto.randomUUID`, but may require passing the UUID generator to the translator.

#### Creating Translators
```js
const short = require('short-uuid');
const { uuidv7 } = require('uuidv7');

// Use the default 'flickrBase58' alphabet
const defaultTranslator = short.createTranslator();

// Provide a custom alphabet (string with unique characters)
const decimalTranslator = short.createTranslator('0123456789');
decimalTranslator.generate(); // 340094463662231729161759792859809060270

// Use built-in constants for common alphabets
const cookieTranslator = short.createTranslator(short.constants.cookieBase90);
cookieTranslator.generate(); // 2TsOi>J4~x&|gunsEt/F

// Use an alternative UUID generator
const v7translator = short.createTranslator({ uuid: uuidv7 });
v7translator.generate(); // 1cuDCtXJn1XgatiyAGv63h

// Use a custom alphabet and options
const customV7translator = short.createTranslator(
  '0123456789abcdef',
  { uuid: uuidv7 }
);
customV7translator.generate(); // 019ad63fa3857c74b6db3fae12026b48
```

#### Encoding and Decoding
```js
// Create a translator
const translator = short.createTranslator();

// Generate a short-encoded UUID
const shortId = translator.generate(); // mhvXdrZT4jP5T8vBxuvm75

// Convert from short-encoded to standard UUID
const fullUUID = translator.toUUID(shortId); // a44521d0-0fb8-4ade-8002-3385545c3318

// Convert from standard UUID to short-encoded format
const shortAgain = translator.fromUUID(fullUUID); // mhvXdrZT4jP5T8vBxuvm75
```

#### Validation
```js
// Check if a string has the correct length and alphabet
translator.validate(shortId); // true or false

// Check if it also translates to a valid RFC4122 UUID
translator.validate(shortId, true);  // true if valid
translator.validate('0000000000000000000000', true); // false
```

#### Plain UUIDs
```js
// Each translator also exposes the uuid function it uses to generate UUIDs
const uuidFromTranslator = defaultTranslator.uuid();
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
// import does not expose a default export
import { constants, createTranslator } from 'short-uuid';

// By default shortened values are now padded for consistent length.
// If you want to produce variable lengths, like in 3.1.1
const translator = createTranslator(constants.flickrBase58, {
  consistentLength: false,
});

// Generate a shortened v4 UUID
translator.generate(); // mhvXdrZT4jP5T8vBxuvm75
```

## Support

short-uuid [6.x](https://github.com/oculus42/short-uuid/blob/v6.0.0/README.md)
and later is tested on Node 14.17.x and later.

## Notes
Documentation updates from [thadeucity](https://github.com/thadeucity)

Original TypeScript definitions by
[alexturek](https://github.com/alexturek).

Please see [Releases](https://github.com/oculus42/short-uuid/releases) for information on previous versions.
