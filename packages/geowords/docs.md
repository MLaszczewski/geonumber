
<a name="readmemd"></a>

geowords

# geowords

## Table of contents

### Interfaces

- [Location](#interfaceslocationmd)

### Functions

- [decodeLocation](#decodelocation)
- [decodeNumber](#decodenumber)
- [encodeLocation](#encodelocation)
- [encodeNumber](#encodenumber)

## Functions

### decodeLocation

▸ **decodeLocation**(`inputWords`, `dict?`): [`Location`](#interfaceslocationmd)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inputWords` | `string`[] | `undefined` |
| `dict` | `string`[] | `words` |

#### Returns

[`Location`](#interfaceslocationmd)

#### Defined in

[geowords/src/index.ts:37](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geowords/src/index.ts#L37)

___

### decodeNumber

▸ **decodeNumber**(`inputWords`, `dict?`): `bigint`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inputWords` | `string`[] | `undefined` |
| `dict` | `string`[] | `words` |

#### Returns

`bigint`

#### Defined in

[geowords/src/index.ts:20](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geowords/src/index.ts#L20)

___

### encodeLocation

▸ **encodeLocation**(`__namedParameters`, `wordsCount?`, `dict?`): `string`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `__namedParameters` | [`Location`](#interfaceslocationmd) | `undefined` |
| `wordsCount` | `number` | `3` |
| `dict` | `string`[] | `words` |

#### Returns

`string`[]

#### Defined in

[geowords/src/index.ts:30](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geowords/src/index.ts#L30)

___

### encodeNumber

▸ **encodeNumber**(`number`, `wordsCount?`, `dict?`): `string`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `number` | `bigint` | `undefined` |
| `wordsCount` | `number` | `3` |
| `dict` | `string`[] | `words` |

#### Returns

`string`[]

#### Defined in

[geowords/src/index.ts:9](https://github.com/MLaszczewski/geowords/blob/45e65ed/packages/geowords/src/index.ts#L9)

# Interfaces


<a name="interfaceslocationmd"></a>

[geowords](#readmemd) / Location

# Interface: Location

## Table of contents

### Properties

- [lat](#lat)
- [lon](#lon)

## Properties

### lat

• **lat**: `number`

#### Defined in

geonumber/lib/index.d.ts:6

___

### lon

• **lon**: `number`

#### Defined in

geonumber/lib/index.d.ts:7
