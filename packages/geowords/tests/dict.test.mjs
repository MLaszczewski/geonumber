import test from "tape"
import { countDictionaryBits } from "../lib/index.js"
import { bip39 } from "../lib/index.js";

test("bip39 length is 2048", t => {
  t.plan(1)
  t.equals(bip39.length, 2048)
})
test("bip39 dictionary word have 11 bits", t => {
  t.plan(1)
  t.equals(countDictionaryBits(bip39), 11n)
})
