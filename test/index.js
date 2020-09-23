/**
 * Created by Samuel on 6/4/2016.
 */

const test = require('tape');
const uuid = require('uuid');
const short = require('../index');

const b90 = short(short.constants.cookieBase90);
const b58 = short(short.constants.flickrBase58);

const cycle = (testcb) => {
  const uu = short.uuid();
  const f58 = b58.fromUUID(uu);
  const f90 = b90.fromUUID(uu);

  testcb(uu, f58, f90);
};

test('short-uuid setup', (t) => {
  t.plan(7);
  let b90test;

  t.ok(typeof short === 'function', 'should be a constructor function');

  t.doesNotThrow(() => {
    b90test = short(short.constants.cookieBase90);
  }, 'Calling does not throw an error');

  t.equal(typeof b90test, 'object', 'constructor returns an object');

  let b58default;

  t.doesNotThrow(() => {
    b58default = short();
  }, 'does not throw error with no options');

  t.equal(b58default.alphabet, short.constants.flickrBase58, 'Default provides the flickrBase58 alphabet');
  t.equal(b58default.maxLength, 22, 'Translators provide maxLength');

  const new58short = b58default.new();
  const new58long = b58default.toUUID(new58short);

  t.ok(uuid.validate(new58long), 'default produces valid output');
});

test('constants', (t) => {
  t.plan(3);
  t.ok(Object.prototype.hasOwnProperty.call(short, 'constants') && typeof short.constants === 'object', 'should contain a "constants" object');
  t.equal(short.constants.flickrBase58, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', 'should contain flicker58 constant');
  t.equal(short.constants.cookieBase90, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~", 'should contain cookie90 constant');
});

// Operations
test('should generate valid UUIDs', (t) => {
  t.plan(10);

  const action = (uu) => {
    t.ok(uuid.validate(uu), 'UUID is valid');
  };

  for (let i = 0; i < 10; i += 1) {
    cycle(action);
  }
});

test('should translate back from multiple bases', (t) => {
  t.plan(40);

  const action = (uu, f58, f90) => {
    t.equal(b58.toUUID(f58), uu, 'Translated b58 matches original');
    t.ok(uuid.validate(b58.toUUID(f58)), 'Translated UUID is valid');

    t.equal(b90.toUUID(f90), uu, 'Translated b90 matches original');
    t.ok(uuid.validate(b90.toUUID(f90)), 'Translated UUID is valid');
  };

  for (let i = 0; i < 10; i += 1) {
    cycle(action);
  }
});

test('should return a standard v4 uuid from instance.uuid()', (t) => {
  t.plan(10);

  const action = () => {
    t.ok(uuid.validate(b58.uuid()), '.uuid() is a valid UUID');
  };

  for (let i = 0; i < 10; i += 1) {
    cycle(action);
  }
});

test('Handle UUIDs that begin with zeros', (t) => {
  t.plan(2);

  const someZeros = '00000000-a70c-4ebd-8f2b-540f7e709092';

  t.equal(someZeros, b58.toUUID(b58.fromUUID(someZeros)), 'Supports starting zeroes');
  t.equal(someZeros, b90.toUUID(b90.fromUUID(someZeros)), 'Supports starting zeroes');
});

test('Handle UUIDs with all zeros', (t) => {
  t.plan(2);

  // Support even invalid UUIDs, for completeness
  const allZeros = '00000000-0000-0000-0000-000000000000';

  t.equal(allZeros, b58.toUUID(b58.fromUUID(allZeros)), 'Supports starting zeroes');
  t.equal(allZeros, b90.toUUID(b90.fromUUID(allZeros)), 'Supports starting zeroes');
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
  t.throws(() => short('001234567899aabcdef'), Error);
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

  const paddedTranslator = short(short.constants.flickrBase58, {
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

  const unpaddedTranslator = short(short.constants.flickrBase58, {
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

  const b58Padded = short(short.constants.flickrBase58, {
    consistentLength: true,
  });

  const b58Vary = short(short.constants.flickrBase58, {
    consistentLength: false,
  });

  t.equal(b58Padded.toUUID(paddedShort), b58Padded.toUUID(unpaddedShort), 'padded and unpadded provide the same uuid on a padded translator');
  t.equal(b58Vary.toUUID(paddedShort), b58Vary.toUUID(unpaddedShort), 'padded and unpadded provide the same uuid on an unpadded translator');
  t.equal(b58Padded.toUUID(paddedShort), b58Vary.toUUID(paddedShort), 'padded provides the same uuid on both translators');
  t.equal(b58Padded.toUUID(unpaddedShort), b58Vary.toUUID(unpaddedShort), 'unpadded provides the same uuid on both translators');
});

test('new should create a shortened UUID', (t) => {
  t.plan(2);

  const shorter = b58.new();
  const expanded = b58.toUUID(shorter);
  const shortened = b58.fromUUID(expanded);

  t.equal(shorter, shortened, 'Generated Short ID is the same as re-shortened ID');
  t.ok(uuid.validate(expanded), 'UUID is valid');
});

test('generate should generate an ID with the Flickr set', (t) => {
  t.plan(3);

  const val = short.generate();
  const expanded = b58.toUUID(val);
  const shortened = b58.fromUUID(expanded);

  t.equal(val, shortened, 'Generated Short ID is the same as re-shortened ID');
  t.ok(uuid.validate(expanded), 'UUID is valid');

  const val2 = short.generate();
  t.ok(val2, 'Generate should reuse the default translator successfully');
});

test('Default generate quantity tests', (t) => {
  t.plan(1);
  let underLength = 0;
  for (let i = 0; i < 10000; i += 1) {
    const defaultGen = short.generate();
    if (defaultGen.length !== 22) {
      underLength += 1;
    }
  }

  t.equal(underLength, 0, 'Ensure default is padded');
});
