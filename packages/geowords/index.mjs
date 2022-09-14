import words from "./words/index.mjs"
import * as geonumber from "geonumber"

const wordBits = 11n

export function encodeNumber(number, wordsCount = 3, wordsList = words) {
  const words = new Array(wordsCount)
  let rest = number
  for(let wordIndex = wordsCount - 1; wordIndex >= 0; wordIndex--) {
    const wordNumber = rest & ((1n << wordBits) - 1n)
    words[wordIndex] = wordsList[Number(wordNumber)]
    rest = rest >> wordBits
  }
  return words
}

export function decodeNumber(words, wordsList = words) {
  let acc = 0n
  for(let wordIndex = words.length - 1; wordIndex >= 0; wordIndex--) {
    const word = wordsList[wordIndex].toLowerCase()
    const wordNumber = words.findIndex(w => w === word)
    acc = (acc << wordBits) | BigInt(wordNumber)
  }
  return acc
}

export function encodeLocation({ lat, lon }, wordsCount = 3, wordsList = words) {
  const bits = BigInt(wordsCount) * wordBits
  const number = geonumber.encodeLocation({ lat, lon }, bits)
  return encodeNumber(number, wordsCount, wordsList)
}

export function decodeLocation(word, wordsList = words) {
  const bits = BigInt(words.length) * wordBits
  const number = decodeNumber(words, wordsList)
  return geonumber.decodeLocation(number, bits)
}
