import words from "./words/index"
import * as geonumber from "geonumber"
import type { Location } from "geonumber"

export { Location }

const wordBits = 11n

export function encodeNumber(number: bigint, wordsCount: number = 3, dict: string[] = words): string[] {
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
  const bits = BigInt(wordsCount) * wordBits
  const number = geonumber.encodeLocation({ lat, lon }, bits)
  return encodeNumber(number, wordsCount, dict)
}

export function decodeLocation(inputWords: string[], dict: string[] = words): Location {
  const bits = BigInt(inputWords.length) * wordBits
  const number = decodeNumber(inputWords, dict)
  return geonumber.decodeLocation(number, bits)
}
