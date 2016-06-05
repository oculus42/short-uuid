# short-uuid
[![Build Status](https://travis-ci.org/oculus42/short-uuid.svg?branch=master)](https://travis-ci.org/oculus42/short-uuid) 
[![Code Climate](https://codeclimate.com/github/oculus42/short-uuid/badges/gpa.svg)](https://codeclimate.com/github/oculus42/short-uuid) 
[![Test Coverage](https://codeclimate.com/github/oculus42/short-uuid/badges/coverage.svg)](https://codeclimate.com/github/oculus42/short-uuid/coverage) 

Translate standard UUIDs into shorter formats and back.

    var shortUUID = require('short-uuid')

short-uuid returns an object with a property "new". This is a constructor that takes a base as a parameter and returns to/from functions:

    {
      fromUUID: function(){..},
      toUUID: function(){..}
      fromHex: function(){..},
      toHex: function(){..},
    }
    
The 'UUID' Functions handle the dashes and left-filled zeros needed for proper UUID support. The 'Hex' functions provide the translation functions from `any-base`.

The short-uuid object also incldues a `constants` object, with base58 and base90 sets. 

* The base58 set `flickrBase58` originates with Flickr and reduces human transcription errors.
* The base90 set `cookieBase90` is the set of allowable characters in a cookie value, and is intended to provide the shortest storage of UUIDs in a browser cookie.

Finally, the Base58 translator is automatically generated and included as `b58` for convenience.
