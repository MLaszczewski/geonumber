import test from "tape"
import { decodeLocation, encodeLocation } from "../index.mjs"

const randomLocation = () => ({
  lat: Math.random() * 180 - 90,
  lon: Math.random() * 360 - 180
})

function testWords(wordsCount, tolerance) {
  return t => {
    const count = 10
    t.plan(count * 2)
    for(let i = 0; i < count; i++) {
      const original = randomLocation()
      const encoded = encodeLocation(original, wordsCount)
      const decoded = decodeLocation(encoded)
      const latError = Math.abs(decoded.lat - original.lat)
      const lonError = Math.abs(decoded.lon - original.lon)
      if(latError > tolerance) {
        t.fail(`latitude error ${latError} is greater than tolerance ${tolerance}`)
      } else {
        t.pass(`latitude error ${latError} is smaller than tolerance ${tolerance}`)
      }
      if(lonError > tolerance) {
        t.fail(`longitude error ${lonError} is greater than tolerance ${tolerance}`)
      } else {
        t.pass(`longitude error ${latError} is smaller than tolerance ${tolerance}`)
      }
    }
  }
}

test("random location with 3 words", testWords(3, 0.002))
test("random location with 4 words", testWords(4, 0.0001))
