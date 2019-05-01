# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

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
