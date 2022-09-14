
export function encodeNumber(value, bits) {
  bits = BigInt(bits)
  const max = Number(1n << bits)
  return BigInt(Math.round(value * max))
}
export function decodeNumber(encoded, bits) {
  bits = BigInt(bits)
  const max = Number(1n << bits)
  return Number(encoded) / max
}
export function merge(a, b, bits) {
  bits = BigInt(bits)
  let result = 0n
  for(let dstBit = 0n; dstBit < bits; dstBit++) {
    const srcBit = dstBit >> 1n
    result |= ((((dstBit & 1n) ? b : a) >> srcBit) & 1n) << dstBit
  }
  return result
}
export function split(encoded, bits) {
  bits = BigInt(bits)
  let a = 0n
  let b = 0n
  for(let srcBit = 0n; srcBit < bits; srcBit++) {
    const dstBit = srcBit >> 1n
    if(srcBit & 1n) {
      a |= ((encoded >> srcBit) & 1n) << dstBit
    } else {
      b |= ((encoded >> srcBit) & 1n) << dstBit
    }
  }
  return [ a, b ]
}

export function encodeLocation({ lat, lon }, bits) {
  bits = BigInt(bits)
  const latBits = bits >> 1n
  const lonBits = bits - latBits
  const normalizedLat = (lat + 90) / 180
  const normalizedLon = (lon + 180) / 360
  const encodedLat = encodeNumber(normalizedLat, latBits)
  const encodedLon = encodeNumber(normalizedLon, lonBits)
  const merged = merge(encodedLon, encodedLat, bits)
  return merged
}

export function decodeLocation(number, bits) {
  number = BigInt(number)
  bits = BigInt(bits)
  const latBits = bits >> 1n
  const lonBits = bits - latBits
  const [encodedLat, encodedLon] = split(number, bits)
  const normalizedLat = decodeNumber(encodedLat, latBits)
  const normalizedLon = decodeNumber(encodedLon, lonBits)
  const lat = normalizedLat * 180 - 90
  const lon = normalizedLon * 360 - 180
  return { lat, lon }
}

