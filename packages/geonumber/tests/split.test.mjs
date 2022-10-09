import test from "tape"
import { merge, split } from "../lib/index.js"

test("split and merge 2 + 2 bits", t => {
  const bits = 2n
  const count = 1 << Number(bits)
  t.plan( count * count * 2 )
  for(let x = 0n; x < count; x++) {
    for(let y = 0n; y < count; y++) {
      const merged = merge(y, x, bits * 2n)
      const [ny, nx] = split(merged, bits * 2n)
      t.equal(x, nx)
      t.equal(y, ny)
    }
  }
})

test("split and merge 2 + 3 bits", t => {
  const xBits = 2n
  const yBits = 3n
  const xCount = 1n << xBits
  const yCount = 1n << yBits
  t.plan( Number(xCount * yCount * 2n) )
  for(let x = 0n; x < (1n << xBits); x++) {
    for(let y = 0n; y < (1n << yBits); y++) {
      const merged = merge(y, x, xBits + yBits)
      const [ny, nx] = split(merged, xBits + yBits)
      console.log(x, nx)
      console.log(y, ny)
      t.equal(x, nx)
      t.equal(y, ny)
    }
  }
})

