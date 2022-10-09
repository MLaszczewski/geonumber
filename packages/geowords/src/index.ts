import words from "./words/index.js"
import * as geonumber from "geonumber"
import type { Location } from "geonumber"
export { Location }

import { bip39, dictionaries } from "./words/index.js";
export { bip39, dictionaries }

export function countDictionaryBits(dict: string[]):bigint {
  return BigInt(BigInt(dict.length).toString(2).length - 1)
}

export function prepareDictionaryFromText(text: string):string[] {
  const dict = text.split(/[^\w]/).filter(x => x.length > 0).map(w => w.toLowerCase())
  for(let i = 0; i < dict.length; i++) {
    for(let j = i + 1; j < dict.length; j++) {
      if(dict[i] === dict[j]) {
        dict.splice(j, 1)
        j--
      }
    }
  }
  return dict
}

export function encodeNumber(number: bigint, wordsCount: number = 3, dict: string[] = words): string[] {
  const wordBits = countDictionaryBits(dict)
  const words = new Array(wordsCount)
  let rest = number
  for(let wordIndex = wordsCount - 1; wordIndex >= 0; wordIndex--) {
    const wordNumber = rest & ((1n << wordBits) - 1n)
    words[wordIndex] = dict[Number(wordNumber)]
    rest = rest >> wordBits
  }
  return words
}

export function decodeNumber(inputWords: string[], dict: string[] = words): bigint {
  const wordBits = countDictionaryBits(dict)
  let acc = 0n
  for(let wordIndex = 0; wordIndex < inputWords.length; wordIndex++) {
    const word = inputWords[wordIndex].toLowerCase()
    const wordNumber = dict.findIndex(w => w === word)
    acc = (acc << wordBits) | BigInt(wordNumber)
  }
  return acc
}

export function encodeLocation({ lat, lon }: Location, wordsCount: number = 3,
                               dict: string[] = words): string[] {
  const wordBits = countDictionaryBits(dict)
  const bits = BigInt(wordsCount) * wordBits
  const number = geonumber.encodeLocation({ lat, lon }, bits)
  return encodeNumber(number, wordsCount, dict)
}

export function decodeLocation(inputWords: string[], dict: string[] = words): Location {
  const wordBits = countDictionaryBits(dict)
  const bits = BigInt(inputWords.length) * wordBits
  const number = decodeNumber(inputWords, dict)
  return geonumber.decodeLocation(number, bits)
}
