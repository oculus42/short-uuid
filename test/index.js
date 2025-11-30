/**
 * Created by Samuel on 6/4/2016.
 */

const test = require('tape');
// Dropping uuid to maintain Node 14 testing compatibility
// const uuid = require('uuid');
const { uuidv7 } = require('uuidv7');
const { constants, generate, createTranslator } = require('../dist/index');
const { validateUUID } = require('../dist/validate');

// Node 18 workaround?
if (globalThis.crypto === undefined) {
  globalThis.crypto = require('node:crypto');
}

const uuid25Examples = require('./uuid25examples');

const b90 = createTranslator(constants.cookieBase90);
const b58 = createTranslator(constants.flickrBase58);
const b36 = createTranslator(constants.uuid25Base36);

const cycle = (testCallback) => {
  // const uu = uuid.v4();
  const uu = crypto.randomUUID();
  const f58 = b58.fromUUID(uu);
  const f90 = b90.fromUUID(uu);
  const f36 = b36.fromUUID(uu);

  testCallback(uu, f58, f90, f36);
};

test('short-uuid setup', (t) => {
  t.plan(6);
  let b90test;

  t.doesNotThrow(() => {
    b90test = createTranslator(constants.cookieBase90);
  }, 'Calling does not throw an error');

  t.equal(typeof b90test, 'object', 'constructor returns an object');

  let b58default;

  t.doesNotThrow(() => {
    b58default = createTranslator();
  }, 'does not throw error with no options');

  t.equal(b58default.alphabet, constants.flickrBase58, 'Default provides the flickrBase58 alphabet');
  t.equal(b58default.maxLength, 22, 'Translators provide maxLength');

  const new58short = b58default.generate();
  const new58long = b58default.toUUID(new58short);

  t.ok(validateUUID(new58long), 'default produces valid output');
});

test('constants', (t) => {
  t.plan(4);
  t.ok(typeof constants === 'object', 'should provide a "constants" object');
  t.equal(constants.flickrBase58, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', 'should contain flicker58 constant');
  t.equal(constants.cookieBase90, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~", 'should contain cookie90 constant');
  t.equal(constants.uuid25Base36, '0123456789abcdefghijklmnopqrstuvwxyz', 'should contain uuid25 constant');
});

// Operations
test('should generate valid UUIDs', (t) => {
  t.plan(10);

  const action = (uu) => {
    t.ok(validateUUID(uu), 'UUID is valid');
  };

  for (let i = 0; i < 10; i += 1) {
    cycle(action);
  }
});

test('should translate back from multiple bases', (t) => {
  t.plan(60);

  const action = (uu, f58, f90, f36) => {
    t.equal(b58.toUUID(f58), uu, 'Translated b58 matches original');
    t.ok(validateUUID(b58.toUUID(f58)), 'Translated UUID is valid');

    t.equal(b90.toUUID(f90), uu, 'Translated b90 matches original');
    t.ok(validateUUID(b90.toUUID(f90)), 'Translated UUID is valid');

    t.equal(b36.toUUID(f36), uu, 'Translated b36 matches original');
    t.ok(validateUUID(b36.toUUID(f36)), 'Translated UUID is valid');
  };

  for (let i = 0; i < 10; i += 1) {
    cycle(action);
  }
});

test('should return a standard v4 uuid from instance.uuid()', (t) => {
  t.plan(10);

  const action = () => {
    t.ok(validateUUID(b58.uuid()), '.uuid() is a valid UUID');
  };

  for (let i = 0; i < 10; i += 1) {
    cycle(action);
  }
});

test('Handle UUIDs that begin with zeros', (t) => {
  t.plan(3);

  const someZeros = '00000000-a70c-4ebd-8f2b-540f7e709092';

  t.equal(someZeros, b58.toUUID(b58.fromUUID(someZeros)), 'Supports starting zeroes');
  t.equal(someZeros, b90.toUUID(b90.fromUUID(someZeros)), 'Supports starting zeroes');
  t.equal(someZeros, b36.toUUID(b36.fromUUID(someZeros)), 'Supports starting zeroes');
});

test('Handle UUIDs with all zeros', (t) => {
  t.plan(3);

  // Support even invalid UUIDs, for completeness
  const allZeros = '00000000-0000-0000-0000-000000000000';

  t.equal(allZeros, b58.toUUID(b58.fromUUID(allZeros)), 'Supports starting zeroes');
  t.equal(allZeros, b90.toUUID(b90.fromUUID(allZeros)), 'Supports starting zeroes');
  t.equal(allZeros, b36.toUUID(b36.fromUUID(allZeros)), 'Supports starting zeroes');
});

test('Handle UUIDs with all "f"s', (t) => {
  t.plan(3);

  // Support even invalid UUIDs, for completeness
  const allFs = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

  t.equal(allFs, b58.toUUID(b58.fromUUID(allFs)), 'Supports all "f"s');
  t.equal(allFs, b90.toUUID(b90.fromUUID(allFs)), 'Supports all "f"s');
  t.equal(allFs, b36.toUUID(b36.fromUUID(allFs)), 'Supports all "f"s');
});

test('should handle UUID with uppercase letters', (t) => {
  t.plan(4);

  const uuidWithUpper = '00000013-0000-1000-8000-0026BB765291';
  const uuidAllLower = uuidWithUpper.toLowerCase();

  const upperB58 = b58.fromUUID(uuidWithUpper);
  const lowerB58 = b58.fromUUID(uuidAllLower);

  const upperBack = b58.toUUID(upperB58);
  const lowerBack = b58.toUUID(lowerB58);

  t.equal(upperB58, lowerB58, 'Translates uppercase letters in UUIDs');
  t.equal(upperBack, lowerBack, 'Translates back to UUID correctly');
  t.equal(upperBack, uuidAllLower, 'From uppercase matches original lowercase');
  t.equal(lowerBack, uuidAllLower, 'From lower matches original lowercase');
});

test('should not be able to use an Alphabet containing duplicated values', (t) => {
  t.plan(1);
  // Check if invalid alphabet throws error
  t.throws(() => createTranslator('001234567899aabcdef'), Error);
});

// Options

// Length
const paddingSetup = (translator) => {
  const uuidA = '01542709-aa56-ae25-5ad3-09237c6c3318';
  const uuidB = '21b8b506-8cb2-79f1-89b3-d45c72ec3318';
  const short58A = translator.fromUUID(uuidA);
  const short58B = translator.fromUUID(uuidB);
  const back58A = translator.toUUID(short58A);
  const back58B = translator.toUUID(short58B);

  return {
    uuidA,
    uuidB,
    short58A,
    short58B,
    back58A,
    back58B,
  };
};

test('should return consistent length shortened ids by default', (t) => {
  t.plan(3);

  const result = paddingSetup(b58);

  t.equal(
    result.short58A.length,
    result.short58B.length,
    'Translates to equal length string',
  );
  t.equal(result.back58A, result.uuidA, 'Padded matches original uuid');
  t.equal(result.back58B, result.uuidB, 'Unpadded matches original uuid');
});

test('should return consistent length shortened ids with option', (t) => {
  t.plan(3);

  const paddedTranslator = createTranslator(constants.flickrBase58, {
    consistentLength: true,
  });

  const result = paddingSetup(paddedTranslator);

  t.equal(
    result.short58A.length,
    result.short58B.length,
    'Translates to equal length string',
  );

  t.equal(result.back58A, result.uuidA, 'Padded matches original uuid');
  t.equal(result.back58B, result.uuidB, 'Unpadded matches original uuid');
});

test('should return inconsistent length shortened ids when flagged', (t) => {
  t.plan(3);

  const unpaddedTranslator = createTranslator(constants.flickrBase58, {
    consistentLength: false,
  });

  const result = paddingSetup(unpaddedTranslator);

  t.notEqual(
    result.short58A.length,
    result.short58B.length,
    'Does not produce equal length strings',
  );
  t.equal(result.back58A, result.uuidA, 'Padded matches original uuid');
  t.equal(result.back58B, result.uuidB, 'Unpadded matches original uuid');
});

test('padded and unpadded values should translate back consistently', (t) => {
  t.plan(4);

  const paddedShort = '12J9PLDMEfCf6da2LyAce5';
  const unpaddedShort = '2J9PLDMEfCf6da2LyAce5';

  const b58Padded = createTranslator(constants.flickrBase58, {
    consistentLength: true,
  });

  const b58Vary = createTranslator(constants.flickrBase58, {
    consistentLength: false,
  });

  t.equal(b58Padded.toUUID(paddedShort), b58Padded.toUUID(unpaddedShort), 'padded and unpadded provide the same uuid on a padded translator');
  t.equal(b58Vary.toUUID(paddedShort), b58Vary.toUUID(unpaddedShort), 'padded and unpadded provide the same uuid on an unpadded translator');
  t.equal(b58Padded.toUUID(paddedShort), b58Vary.toUUID(paddedShort), 'padded provides the same uuid on both translators');
  t.equal(b58Padded.toUUID(unpaddedShort), b58Vary.toUUID(unpaddedShort), 'unpadded provides the same uuid on both translators');
});

test('generate should generate an ID with the Flickr set', (t) => {
  t.plan(3);

  const val = generate();
  const expanded = b58.toUUID(val);
  const shortened = b58.fromUUID(expanded);

  t.equal(val, shortened, 'Generated Short ID is the same as re-shortened ID');
  t.ok(validateUUID(expanded), 'UUID is valid');

  const val2 = generate();
  t.ok(val2, 'Generate should reuse the default translator successfully');
});

// Test examples from https://github.com/uuid25/test_cases/blob/main/examples
test('uuid25 should be compatible with uuid25 examples', (t) => {
  t.plan(uuid25Examples.length * 2);
  uuid25Examples.forEach(({ uuid25, hyphenated }) => {
    t.equal(b36.toUUID(uuid25), hyphenated);
    t.equal(b36.fromUUID(hyphenated), uuid25);
  });
});

test('Different UUID Generators', (t) => {
  t.plan(4);

  // const b36WithUuid4 = createTranslator(constants.uuid25Base36, { uuid: uuid.v4 });
  const b36WithUuid4 = createTranslator(constants.uuid25Base36);
  const b36WithUuid7 = createTranslator(constants.uuid25Base36, { uuid: uuidv7 });

  const shortFromV4 = b36WithUuid4.generate();
  const shortFromV7 = b36WithUuid7.generate();

  // Validate both are valid UUID with the standard b36 translator
  t.ok(b36.validate(shortFromV4));
  t.ok(b36.validate(shortFromV7));

  // Validate they translate back to the same UUID
  t.equal(b36WithUuid4.toUUID(shortFromV4), b36WithUuid7.toUUID(shortFromV4));
  t.equal(b36WithUuid4.toUUID(shortFromV7), b36WithUuid7.toUUID(shortFromV7));
});

test('Translator should provide correct maxLength', (t) => {
  t.plan(3);
  t.equal(b36.maxLength, 25, 'uuid25 is 25');
  t.equal(b58.maxLength, 22, 'flickr is 22');
  t.equal(b90.maxLength, 20, 'cookie is 20');
});

test('Default generate quantity tests', (t) => {
  t.plan(1);
  let underLength = 0;
  for (let i = 0; i < 10000; i += 1) {
    const defaultGen = generate();
    if (defaultGen.length !== 22) {
      underLength += 1;
    }
  }

  t.equal(underLength, 0, 'Ensure default is padded');
});

test('Validate', (t) => {
  t.plan(25);

  // Bad type
  t.notOk(b36.validate(100), 'only strings');

  // Too short
  t.notOk(b36.validate('123'), 'uuid25 too short');
  t.notOk(b58.validate('123'), 'flickr too short');
  t.notOk(b90.validate('123'), 'cookie too short');

  // Short is valid without consistentLength
  const s36 = createTranslator(constants.uuid25Base36, { consistentLength: false });
  const s58 = createTranslator(constants.flickrBase58, { consistentLength: false });
  const s90 = createTranslator(constants.cookieBase90, { consistentLength: false });
  t.ok(s36.validate('111'));
  t.ok(s58.validate('111'));
  t.ok(s90.validate('111'));

  // Too long
  t.notOk(b36.validate('123456789012345678901234567890'), 'uuid25 too long');
  t.notOk(b58.validate('123456789012345678901234567890'), 'flickr too long');
  t.notOk(b90.validate('123456789012345678901234567890'), 'cookie too long');

  // Bad alphabet
  t.notOk(b36.validate('123456789012345678901234"'), 'uuid25 validates alphabet');
  t.notOk(b58.validate('123456789012345678901"'), 'flickr validates alphabet');
  t.notOk(b90.validate('1234567890123456789"'), 'cookie validates alphabet');

  // Generated value passes
  t.ok(b36.validate(b36.generate()), 'uuid25 validates');
  t.ok(b58.validate(b58.generate()), 'flickr validates');
  t.ok(b90.validate(b90.generate()), 'cookie validates');

  // "empty" value passes without uuid check
  t.notOk(b36.validate('0'), 'uuid25 passes bad uuid without check');
  t.notOk(b58.validate('0'), 'flickr fails bad uuid without check');
  t.notOk(b90.validate('0'), 'cookie fails bad uuid without check');

  // With uuid check
  t.ok(b36.validate(b36.generate(), true), 'uuid25 validates uuid');
  t.ok(b58.validate(b58.generate(), true), 'flickr validates uuid');
  t.ok(b90.validate(b90.generate(), true), 'cookie validates uuid');

  t.notOk(b36.validate('0', true), 'uuid25 fails bad uuid');
  t.notOk(b58.validate('0', true), 'flickr fails bad uuid');
  t.notOk(b90.validate('0', true), 'cookie fails bad uuid');
});

test('Create Translator', (t) => {
  t.plan(3);
  let id;

  const tDefault = createTranslator();
  const tV7 = createTranslator({ uuid: uuidv7 });
  t.ok(tDefault.uuid !== tV7.uuid, 'Different UUID generators');

  id = tDefault.generate();
  t.ok(tDefault.validate(id, true), 'Generated ID is valid');

  id = tV7.generate();
  t.ok(tV7.validate(id, true), 'Generated ID is valid');
});
