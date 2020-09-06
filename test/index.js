/**
 * Created by Samuel on 6/4/2016.
 */

var test = require('tape');
var short = require('../index');

var validUUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

test('short-uuid setup', function(t) {
    t.plan(6);
    let b90;

    t.ok(typeof short === 'function', 'should be a constructor function');

    t.doesNotThrow(function () {
        b90 = short(short.constants.cookieBase90);
    }, "Calling does not throw an error");

    t.equal(typeof b90, 'object', "constructor returns an object");

    let b58default;

    t.doesNotThrow(function () {
        b58default = short();
    }, 'does not throw error with no options');

    t.equal(b58default.alphabet, short.constants.flickrBase58, 'Default provides the flickrBase58 alphabet');

    const new58short = b58default.new();
    const new58long = b58default.toUUID(new58short);

    t.ok(validUUIDRegex.test(new58long), 'default produces valid output');
});
test('constants', function(t) {
    t.plan(3);
    t.ok(short.hasOwnProperty('constants') && typeof short.constants === 'object', 'should contain a "constants" object');
    t.equal(short.constants.flickrBase58, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', 'should contain flicker58 constant');
    t.equal(short.constants.cookieBase90, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~", 'should contain cookie90 constant');
});

    test('operation', function(t){

        let b90 = short(short.constants.cookieBase90);
        let b58 = short(short.constants.flickrBase58);

        const cycle = function(testcb) {
            uu = short.uuid();
            f58 = b58.fromUUID(uu);
            f90 = b90.fromUUID(uu);

            testcb(uu, f58, f90);
        };

        var uu, f58, f90, i, action;

        it('should generate valid UUIDs', function(){

            action = function(uu) {
                t.ok(validUUIDRegex.test(uu), 'UUID is valid');
            };

            for (i = 0; i < 10; i++) {
                cycle(action);
            }
        });

        it('should translate back from multiple bases', function(){

            action = function(uu, f58, f90) {
                t.equal(b58.toUUID(f58), uu, 'Translated b58 matches original');
                t.ok(validUUIDRegex.test(b58.toUUID(f58)), 'Translated UUID is valid');

                t.equal(b90.toUUID(f90), uu, 'Translated b90 matches original');
                t.ok(validUUIDRegex.test(b90.toUUID(f90)), 'Translated UUID is valid');
            };

            for (i = 0; i < 10; i++) {
                cycle(action);
            }

        });

        it('should return a standard v4 uuid from instance.uuid()', function(){

            action = function() {
                assert.ok(validUUIDRegex.test(b58.uuid()), '.uuid() is a valid UUID');
            };

            for (i = 0; i < 10; i++) {
                cycle(action);
            }
        });

        it('should handle UUIDs that begin with zeros', function(){
            var someZeros = '00000000-a70c-4ebd-8f2b-540f7e709092';

            // Support even invalid UUIDs, for completeness
            var allZeros = '00000000-0000-0000-0000-000000000000';

            assert.equal(someZeros, b58.toUUID(b58.fromUUID(someZeros)),'Supports starting zeroes');
            assert.equal(someZeros, b90.toUUID(b90.fromUUID(someZeros)),'Supports starting zeroes');

            assert.equal(allZeros, b58.toUUID(b58.fromUUID(allZeros)),'Supports starting zeroes');
            assert.equal(allZeros, b90.toUUID(b90.fromUUID(allZeros)),'Supports starting zeroes');
        });

        it('should handle UUID with uppercase letters', function(){
            var uuidWithUpper = '00000013-0000-1000-8000-0026BB765291',
                uuidAllLower = uuidWithUpper.toLowerCase(),

                upperB58 = b58.fromUUID(uuidWithUpper),
                lowerB58 = b58.fromUUID(uuidAllLower),

                upperBack = b58.toUUID(upperB58),
                lowerBack = b58.toUUID(lowerB58);

            assert.equal(upperB58, lowerB58, 'Translates uppercase letters in UUIDs');
            assert.equal(upperBack, lowerBack, 'Translates back to UUID correctly');
            assert.equal(upperBack, uuidAllLower, 'From uppercase matches original lowercase');
            assert.equal(lowerBack, uuidAllLower, 'From lower matches original lowercase');
        });

        it('should not be able to use an Alphabet containing duplicated values', function(){
            // Check if invalid alphabet throws error
            assert.throws(() => short('001234567899aabcdef'), Error);
        });

    });

    describe('options', function(){
        it("should return consistent length shortened ids when flagged", function () {
            var b58 = short(short.constants.flickrBase58, {
              consistentLength: true,
            });

            var uuidA = "01542709-aa56-ae25-5ad3-09237c6c3318",
              uuidB = "21b8b506-8cb2-79f1-89b3-d45c72ec3318",
              short58A = b58.fromUUID(uuidA),
              short58B = b58.fromUUID(uuidB),
              back58A = b58.toUUID(short58A),
              back58B = b58.toUUID(short58B);

            assert.equal(
              short58A.length,
              short58B.length,
              "Translates to equal length string"
            );
            assert.equal(back58A, uuidA, "Translates back to uuid");
            assert.equal(back58B, uuidB, "Translates back to uuid");
        });
    });

    describe('new', function(){
        it('should create a shortened UUID', function(){
            var b58 = short(short.constants.flickrBase58);

            var shorter = b58.new();
            var expanded = b58.toUUID(shorter);
            var shortened = b58.fromUUID(expanded);

            assert.equal(shorter, shortened, 'Generated Short ID is the same as re-shortened ID');

            assert.ok(validUUIDRegex.test(expanded), 'UUID is valid');

        })

    });

    describe('generate', function(){
        it('should generate an ID with the Flickr set', function(){
            var val = short.generate();

            var b58 = short(short.constants.flickrBase58);

            var expanded = b58.toUUID(val);
            var shortened = b58.fromUUID(expanded);

            assert.equal(val, shortened, 'Generated Short ID is the same as re-shortened ID');

            assert.ok(validUUIDRegex.test(expanded), 'UUID is valid');
        });

        it('should reuse the translator', function() {
            var val = short.generate();
            // No complex test, this is validating the second-time code path
            assert.ok(val);
        })
    });
});
