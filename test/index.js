/**
 * Created by Samuel on 6/4/2016.
 */

var assert = require('assert');
var short = require('../index');

var b90;

describe('short-uuid', function(){

    describe('new', function(){

        it('should contain a "new" function', function(){

            var b90;
            assert.ok(short.hasOwnProperty('new') && typeof short.new === 'function');

            assert.doesNotThrow(function(){
                b90 = short.new(short.constants.cookieBase90);
            }, "Calling new does not throw an error");

            assert.equal(typeof b90, 'object', "new returns an object");
        });
    });

    describe('constants', function(){

        it('should contain a "constants" object', function(){
            assert.ok(short.hasOwnProperty('constants') && typeof short.constants === 'object');
        });

        it('should contain constant values', function(){
            assert.equal(short.constants.flickrBase58, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ');
            assert.equal(short.constants.cookieBase90, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~");
        });
    });

    describe('operation', function(){

        var b90 = short.new(short.constants.cookieBase90);
        var b58 = short.b58;

        var uu, f58, f90;

        for (var i = 0; i < 10; i++) {
            uu = short.uuid();

            f58 = b58.fromUUID(uu);
            f90 = b90.fromUUID(uu);

            it('should translate back from multiple bases', function(){

                assert.equal(b58.toUUID(f58), uu, 'Translated b58 matches original');
                assert.equal(b90.toUUID(f90), uu, 'Translated b90 matches original');
            });

        }
        
        it('should handle UUIDs that begin with zeros', function(){
            var someZeros = '00000000-a70c-4ebd-8f2b-540f7e709092';
            var allZeros = '00000000-0000-0000-0000-000000000000';

            assert.equal(someZeros, b58.toUUID(b58.fromUUID(someZeros)),'Supports starting zeroes');
            assert.equal(someZeros, b90.toUUID(b90.fromUUID(someZeros)),'Supports starting zeroes');

            assert.equal(allZeros, b58.toUUID(b58.fromUUID(allZeros)),'Supports starting zeroes');
            assert.equal(allZeros, b90.toUUID(b90.fromUUID(allZeros)),'Supports starting zeroes');
        });

    });

});