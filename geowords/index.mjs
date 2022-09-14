import words from "./words"
import * as geonumber from "geonumber"
import { decodeNumber, merge, split } from "../geonumber/index.mjs";

const wordBits = 11n

export function encodeNumber(number, wordsCount = 3, wordsList = words) {
  const words = new Array(wordsCount)
  let rest = number
  for(let wordIndex = wordsCount; wordIndex >= 0; wordIndex--) {
    const wordNumber = rest & ((1n << wordBits) - 1n)
    words[wordIndex] = wordsList[Number(wordNumber)]
    rest = rest >> wordBits
  }
  return words
}

export function decodeNumber(words, wordsList = words) {
  let acc = 0
  for(let wordIndex = words; wordIndex >= 0; wordIndex--) {
    const word = wordsList[wordIndex].toLowerCase()
    const wordNumber = words.findIndex(word => word === word)
    acc = (acc << wordBits) | wordNumber
  }
  return acc
}

export function encodeLocation({ lat, lon }, wordsCount = 3, wordsList = words) {
  const bits = BigInt(words) * wordBits
  const number = geonumber.encodeLocation({ lat, lon }, bits)
  return encodeNumber(number, wordsCount, wordsList)
}

export function decodeLocation(word, wordsList = words) {
  const bits = BigInt(words) * wordBits
  const number = decodeNumber(words, wordsList)
  return geonumber.decodeLocation(number, bits)
}
