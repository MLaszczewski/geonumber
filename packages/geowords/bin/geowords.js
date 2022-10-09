#!/usr/bin/env node

import yargs from "yargs"
import { hideBin } from 'yargs/helpers'
import {
  encodeLocation, decodeLocation, prepareDictionaryFromText, countDictionaryBits, dictionaries
} from '../lib/index.js'
import { readFile, writeFile } from 'fs/promises'

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

process.on('uncaughtException', function (err) {
  console.error(err.stack)
})

function codeOptions(yargs, defaults = {}) {
  yargs.option('dict', {
    describe: 'select embedded dictionary ( '+ Object.keys(dictionaries).join(' | ') +' )',
    type: 'string',
    default: 'bip39'
  })
  yargs.option('dictFile', {
    describe: 'load dictionary from file',
    type: "string"
  })
}

const argv = yargs(hideBin(process.argv))
  .command('encode [lat] [lon] [words]', 'encode geographic coordinates', (yargs) => {
    codeOptions(yargs)
    yargs.positional('lat', {
      describe: 'latitude',
    }).demandOption('lat')
    yargs.positional('lon', {
      describe: 'longitude',
    }).demandOption('lon')
    yargs.positional('words', {
      describe: 'number of words',
      default: 4
    })
  }, (argv) => encode(argv))
  .command('decode [words...]', 'decode geographic coordinates', (yargs) => {
    codeOptions(yargs)
    yargs.positional('words', {
      describe: 'coordinates encoded as words',
    }).demandOption('words')
  }, (argv) => decode(argv))
  .command('dictionary [sourceFile] [dictFile]',
    'create dictionary from file', (yargs) => {
    yargs.positional('sourceFile', {
      describe: 'file containing text to create dictionary from',
    }).demandOption('sourceFile')
    yargs.positional('dictFile', {
      describe: 'file to save dictionary to',
    }).demandOption('dictFile')
    yargs.option('minWordLength', {
      describe: 'minimum word length',
      default: 3
    })
    yargs.option('maxWordLength', {
      describe: 'maximum word length',
      default: 10
    })
    yargs.option('maxLength', {
      describe: 'maximum dictionary length',
      default: 4096
    })
    yargs.option('format', {
      describe: 'output format ( list | json | esm )',
      type: "string",
      default: 'list'
    })
  }, (argv) => dictionary(argv))
  .demandCommand()
  .parse()

async function getDictionary({dict, dictFile}) {
  if (dictFile) {
    const dict = await readFile(dictFile, 'utf8')
    if(dict[0] == '[') {
      return JSON.parse(dict)
    } else {
      return dict.split('\n').filter(w => w.length > 0)
    }
  } else if (dict) {
    return dictionaries[dict]
  } else {
    return dictionaries.bip39
  }
}

async function encode(argv) {
  const {lat, lon, words} = argv
  const dict = await getDictionary(argv)
  const encoded = encodeLocation({lat, lon}, words, dict)
  console.log(encoded.join(' '))
}

async function decode(argv) {
  const {words} = argv
  const dict = await getDictionary(argv)
  const decoded = decodeLocation(words, dict)
  console.log(decoded.lat, decoded.lon)
}

async function dictionary(argv) {
  const {sourceFile, dictFile, minWordLength, maxWordLength, maxLength, format} = argv
  console.log('loading text', sourceFile)
  const source = await readFile(sourceFile, 'utf8')
  let dict = prepareDictionaryFromText(source)
  dict = dict.filter(word => word.length <= maxWordLength && word.length >= minWordLength)
  console.log('full dictionary size', dict.length)
  dict = dict.slice(0, maxLength)
  const bits = Number(countDictionaryBits(dict))
  console.log('dictionary bits', bits)
  dict.length = 1 << bits
  console.log('cutting to', dict.length, 'words')
  console.log('saving dictionary as', format, 'to', dictFile)
  switch(format) {
    case 'list':
      return await writeFile(dictFile, dict.join('\n'))
    case 'json':
      return await writeFile(dictFile, JSON.stringify(dict, null, "  "))
    case 'esm':
      return await writeFile(dictFile, `export default ${JSON.stringify(dict, null, "  ")}`)
    default:
      throw new Error(`unknown format ${format}`)
  }
}
