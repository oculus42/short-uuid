# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [4.2.2] - 2022-10-18
### Changed
- Updated README

## [4.2.1] - 2022-10-18
### Added
- GitHub Actions
- Testing to Node 16.x and 18.x

### Changed
- npm audit updated dependencies

### Removed
- Travis-CI integration
- Snyk.io integration

## [4.2.0] - 2021-05-13
### Added
- maxLength property to TypeScript definitions
- UUID types to TypeScript definitions

### Changed
- UUID version to 8.3.2
- Updated dev dependencies

## [4.1.0] - 2020-09-07
### Added
- maxLength property to translators

### Changed
- Translator objects are now frozen

## [4.0.3] - 2020-09-07
### Changed
- Fixed default generate length inconsistency identified by [thadeucity](https://github.com/thadeucity)
- Added additional test

## [4.0.2] - 2020-09-07
### Changed
- No code changes
- Eslint cleanup
- Test cleanup based on CodeClimate
- Updated bad links and formatting in [README.md]

## [4.0.1] - 2020-09-06
### Changed
- Fixed default `.generate()` to use padStart correctly.

## [4.0.0] - 2020-09-06 (Unreleased)
### MAJOR CHANGES
- 🛑 short-uuid will now throw an error when provided an alphabet with duplicate characters. Duplicate characters will cause translation errors.
- ℹ️ 4.0.0 is written in modern ECMAScript. It uses features through ES9/ES2018.
- ℹ️ 4.x does not yet include the pre-built version for browsers. If needed, continue to use 3.1.1 in the meantime.
- ℹ️ By default, short-uuid will pad shortened IDs to a consistent length.
  - Padding does not affect translation, and the values are compatible with previous releases.
  - Padding can be disabled with the option `consistentLength: false` when instantiating a translator. This is consistent with previous versions.

### Added
- eslint rules
- tape testing library

### Changed
- Merged PR #44 from [qgerome](https://github.com/qgerome) to fix uuid version deprecation
- Merged PR #47 from [thadeucity](https://github.com/thadeucity) to resolve #39 for consistent length
- Switched tests to tape
- Updated to ES6
- Switched from Greenkeeper to Snyk.io
- Dropped support for Node prior to 8.x
- Updated link to uuid repo in Notes in [README.md]

### Removed
- Removed browserify, grunt, & mocha
- Removed built version for browser

## [3.1.1] - 2019-05-01
### Changed
- Updated dev packages to replace istanbul with nyc
- Updated [gruntfile.js] for nyc
- Updated [.gitignore] for nyc
- Removed Node 4.x build in [.travis.yml]
- Included Node 12.x build in [.travis.yml]
- Dropped Node 4.x build due to nested build dependencies

## [3.1.0] - 2018-12-08
### Changed
- Updated dev packages for vulnerability fixes
- Added top-level `generate` in [index.js]
- Added `generate` alias on translators in [index.js]
- Added tests for `generate`
- Updated [index.d.ts] definitions
- Update [README.md] to help clarify the functionality

## [3.0.1] - 2018-10-18
### Changed
- Build dependencies update

## [3.0.0] - 2018-03-24
### Changed
- Refactored export in [gruntfile.js] for CodeClimate
- Refactored export in [index.js] for CodeClimate
- Updated dependencies - all patch or minor
- Updated Mocha devDependency - Major version update
- Updated other devDependencies - all patch or minor
- Dropped build support for Node 0.10 and 0.12 due to nested build dependencies

## [2.3.4] - 2017-08-08
### Changed
- Corrected shortenUUID function in [index.js]
- Added test cases for uppercase in [test/index.js]
- Added 2.3.4 fix notes in [README.md]
- Refactored "random" test cases so only the assertions loop in [test/index.js]
- Updated devDependencies for codeclimate-test-reporter in [package.json]
- Included Node 8.x support in [.travis.yml]

## [2.3.3] - 2017-05-22
### Changed
- Changed [.npmignore] To remove dist, so the built files end up on the package. No code changes.

## [2.3.2] - 2017-05-16
### Added
- Added [index.d.ts] TypeScript definitions. No code changes.

### Changed
- Changed [package.json] to reference TypeScript definitions

## [2.3.1] - 2017-05-14
### Changed
- Merged 2.1.x revision history in [README.md] and [revisions.md].  No code changes.

## [2.3.0] - 2017-05-14
### Changed
- Moved Snyk to devDependencies in [package.json]
- Updated devDependencies grunt-contrib-uglify
- Corrected Snyk spelling error in [README.md]

## [2.2.0] - 2016-11-30
### Added
- Added Snyk vulnerability monitoring and patching

### Changed
- Updated devDependencies and added Snyk scripts to [package.json]

## [2.1.4] - 2017-05-14
### Changed
- Correction of unpublish to deprecate. No code changes.
- Updated [README.md], versions.

## [2.1.3] - 2017-05-14
### Changed
- Correction of bad npm publish. No code changes.
- Updated [README.md], versions.

## [2.1.2] - 2016-11-30
### Changed
- Updated from `node-uuid` to `uuid`, per the author
- Switched to using only `uuid/v4` for a smaller footprint

## [2.1.1] - 2016-11-13
### Added
- Add dist files to npm package

### Changed
- Add files list to [package.json]

## [2.1.0] - 2016-11-06
### Added
- Add browser support with Browserify as proposed by [voronianski](https://github.com/voronianski)
- Include `grunt-mkdir` to support build process
- Include `grunt-browserify` to support build process
- Include `grunt-contrib-uglify` to support build process
- Add example/index.html for Browserify demo
- Add various dotfiles for CodeClimate configs

### Changed
- Add to [gruntfile.js] for new modules
- Add to [package.json] for build command
- Add dist folder to [.gitignore]
- Update [revisions.md]
- Update [README.md] with Browserify details

## [2.0.0] - 2016-06-19
### Added
- Include `node-uuid` so we can generate our own UUIDs.
- Add `.new()` to the translator object to generate a translated v4 UUID.
- Add `.alphabet` to the translator object so you can inspect the alphabet.
- Expose `.uuid()` for v4 UUID generation on the export *and* on each translator, for convenience.
- Added this change log.
- Added [revisions.md] for tracking usage of old versions.
- Added tests for new UUID generation, defaults, and exposed alphabet.

### Changed
- Use a Constructor rather than needing to call .new() against the export.
- Default flickrBase58 alphabet if none is provided.
- Changed to IIFE for better minification.
- Changed tests for updated object format.

### Removed
- Remove the pre-built `.b58` library so we don't waste resources.
- Remove `.toHex()` and `.fromHex()` from the translators. Use `any-base` directly if needed.

## 1.0.0 - 2016-06-10
### Added
- Provide `.new()` to create a translator.
- Provide `.constants` for useful alphabets
 - `flickrBase58` is meant to reduce human transcription errors
 - `cookieBase90` provides the characters supported by cookies for the smallest cookie-safe UUIDs
- Provide `.fromUUID()` and `.toUUID()` from the translators.
- Provide `.toHex()` and `.fromHex()` from the translators.
- Provide the flickrBase58 translator by default as `.b58`

[2.0.0]: https://github.com/oculus42/short-uuid/compare/v1.0.0...v2.0.0
