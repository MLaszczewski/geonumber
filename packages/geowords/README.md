# Welcome to geowords 👋
[![Version](https://img.shields.io/npm/v/geowords.svg)](https://www.npmjs.com/package/geowords)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/MLaszczewski/geowords#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/MLaszczewski/geowords/graphs/commit-activity)
[![License: BSD--3--Clause](https://img.shields.io/github/license/MLaszczewski/geowords)](https://github.com/MLaszczewski/geowords/blob/master/LICENSE)

> Tool for encoding geographic coordinates as sequence of words from bip39 or other dictionary

### 🏠 [Homepage](https://github.com/MLaszczewski/geowords)

# Command line interface

## Install

```sh
yarn global add geowords
```
or
```sh
npm install --global geowords
```

## Usage

```
> geowords encode 23 23 4
ship add travel abstract
> geowords decode ship add travel
22.9998779296875 22.9998779296875
> geowords decode ship add
22.939453125 22.8515625
```

### Encode or decode geographic coordinates:
```
geowords encode [lat] [lon] [words] [options]
  lat    latitude         [required]
  lon    longitude        [required]
  words  number of words  [default: 4]
```
```
geowords decode [words...]
  words  coordinates encoded as words [required]
```
#### Options:
```
  --dict      select embedded dictionary ( bip39 | doi )
              [default: "bip39"]
  --dictFile  load dictionary from file  [string]
```
### Generate dictionary
```
geowords dictionary [sourceFile] [dictFile]
  sourceFile  file containing text to create dictionary from          [required]
  dictFile    file to save dictionary to                              [required]
```
#### Options:
```
  --help           Show help                                           [boolean]
  --version        Show version number                                 [boolean]
  --minWordLength  minimum word length                              [default: 3]
  --maxWordLength  maximum word length                             [default: 10]
  --maxLength      maximum dictionary length                     [default: 4096]
  --format         output format ( list | json | esm )[string] [default: "list"]
```

# Package

### 📄 [API Documentation](https://github.com/MLaszczewski/geowords/blob/master/packages/geowords/docs.md)

## Install package

```sh
yarn add geowords
```
or
```sh
npm install --save geowords
```

## Run tests

```sh
npm test
```

## Author

👤 **Michał Łaszczewski**

* Website: https://www.laszczewski.com
* Github: [@MLaszczewski](https://github.com/MLaszczewski)
* LinkedIn: [@michał-łaszczewski](https://linkedin.com/in/michał-łaszczewski)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/MLaszczewski/geowords/issues). You can also take a look at the [contributing guide](https://github.com/MLaszczewski/geowords/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2022 [Michał Łaszczewski](https://github.com/MLaszczewski).

This project is [BSD--3--Clause](https://github.com/MLaszczewski/geowords/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
