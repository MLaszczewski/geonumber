
export function encodeNumber(value: number, bits: bigint | number): bigint {
  const cleanBits: bigint = BigInt(bits)
  const max = Number(1n << cleanBits)
  return BigInt(Math.round(value * max))
}
export function decodeNumber(encoded: bigint, bits: bigint | number): number {
  const cleanBits: bigint = BigInt(bits)
  const max = Number(1n << cleanBits)
  return Number(encoded) / max
}
export function merge(a: bigint, b: bigint, bits: bigint | number): bigint {
  const cleanBits: bigint = BigInt(bits)
  let result = 0n
  const oddBits = cleanBits & 1n
  for(let dstBit = 0n; dstBit < cleanBits; dstBit++) {
    const srcBit = dstBit >> 1n
    result |= (((((dstBit & 1n) != oddBits) ? a : b) >> srcBit) & 1n) << dstBit
  }
  return result
}
export function split(encoded: bigint, bits: bigint | number): [bigint, bigint] {
  const cleanBits: bigint = BigInt(bits)
  let a = 0n
  let b = 0n
  const oddBits = cleanBits & 1n
  for(let srcBit = 0n; srcBit < cleanBits; srcBit++) {
    const dstBit = srcBit >> 1n
    if((srcBit & 1n) == oddBits) {
      b |= ((encoded >> srcBit) & 1n) << dstBit
    } else {
      a |= ((encoded >> srcBit) & 1n) << dstBit
    }
  }
  return [ a, b ]
}

export interface Location {
  lat: number
  lon: number
}

export function encodeLocation({ lat, lon }:Location, bits: bigint | number): bigint {
  const cleanBits: bigint = BigInt(bits)
  const latBits = cleanBits >> 1n
  const lonBits = cleanBits - latBits
  const normalizedLat = (lat + 90) / 180
  const normalizedLon = (lon + 180) / 360
  const clearedLat = normalizedLat - Math.floor(normalizedLat);
  const clearedLon = normalizedLon - Math.floor(normalizedLon);
  const encodedLat = encodeNumber(clearedLat, latBits)
  const encodedLon = encodeNumber(clearedLon, lonBits)
  const merged = merge(encodedLon, encodedLat, cleanBits)
  return merged
}

export function decodeLocation(number: bigint | number, bits: bigint | number): Location {
  const cleanNumber: bigint = BigInt(number)
  const cleanBits: bigint = BigInt(bits)
  const latBits = cleanBits >> 1n
  const lonBits = cleanBits - latBits
  const [encodedLon, encodedLat] = split(cleanNumber, cleanBits)
  const normalizedLat = decodeNumber(encodedLat, latBits)
  const normalizedLon = decodeNumber(encodedLon, lonBits)
  const lat = normalizedLat * 180 - 90
  const lon = normalizedLon * 360 - 180
  return { lat, lon }
}

