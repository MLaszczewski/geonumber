
<a name="readmemd"></a>

geonumber

# geonumber

## Table of contents

### Interfaces

- [Location](#interfaceslocationmd)

### Functions

- [decodeLocation](#decodelocation)
- [decodeNumber](#decodenumber)
- [encodeLocation](#encodelocation)
- [encodeNumber](#encodenumber)
- [merge](#merge)
- [split](#split)

## Functions

### decodeLocation

▸ **decodeLocation**(`number`, `bits`): [`Location`](#interfaceslocationmd)

#### Parameters

| Name | Type |
| :------ | :------ |
| `number` | `number` \| `bigint` |
| `bits` | `number` \| `bigint` |

#### Returns

[`Location`](#interfaceslocationmd)

#### Defined in

[index.ts:53](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geonumber/src/index.ts#L53)

___

### decodeNumber

▸ **decodeNumber**(`encoded`, `bits`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | `bigint` |
| `bits` | `number` \| `bigint` |

#### Returns

`number`

#### Defined in

[index.ts:7](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geonumber/src/index.ts#L7)

___

### encodeLocation

▸ **encodeLocation**(`__namedParameters`, `bits`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`Location`](#interfaceslocationmd) |
| `bits` | `number` \| `bigint` |

#### Returns

`bigint`

#### Defined in

[index.ts:41](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geonumber/src/index.ts#L41)

___

### encodeNumber

▸ **encodeNumber**(`value`, `bits`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `bits` | `number` \| `bigint` |

#### Returns

`bigint`

#### Defined in

[index.ts:2](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geonumber/src/index.ts#L2)

___

### merge

▸ **merge**(`a`, `b`, `bits`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `bigint` |
| `b` | `bigint` |
| `bits` | `number` \| `bigint` |

#### Returns

`bigint`

#### Defined in

[index.ts:12](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geonumber/src/index.ts#L12)

___

### split

▸ **split**(`encoded`, `bits`): [`bigint`, `bigint`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | `bigint` |
| `bits` | `number` \| `bigint` |

#### Returns

[`bigint`, `bigint`]

#### Defined in

[index.ts:21](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geonumber/src/index.ts#L21)

# Interfaces


<a name="interfaceslocationmd"></a>

[geonumber](#readmemd) / Location

# Interface: Location

## Table of contents

### Properties

- [lat](#lat)
- [lon](#lon)

## Properties

### lat

• **lat**: `number`

#### Defined in

[index.ts:37](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geonumber/src/index.ts#L37)

___

### lon

• **lon**: `number`

#### Defined in

[index.ts:38](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geonumber/src/index.ts#L38)
