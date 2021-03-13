# struct-prototype
Prototype to create a JS struct check library.

## Code Quality Status
![Build Status](https://github.com/gastonpereyra/struct-prototype/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://img.shields.io/coveralls/github/gastonpereyra/struct-prototype/master.svg)](https://coveralls.io/r/gastonpereyra/struct-prototype?branch=master)

---

## Description
It's a function to check a simple data structure.

## Method

* `structPrototype(STRUCTURE|TYPE)(DATA): DATA|ERROR`

### Parameters

#### TYPE

The primitive **type** you want to check. In all cases must be pass as in an `string`

Supported:
* `'string'`
* `'number'`
* `'boolean'`
* `'object'`
* `'string'`
* `'array'`
* `'null'`

#### STRUCTURE

You can define an data structure using a little more complex schema.

* **Array**: `[TYPE]`, check every element of the array to match that **type**
* **Object**: `{ [fieldName]: TYPE }`: check if every field define match that the **type** declared
* **Function**: ``(data) => true|false`: you can pass a function callback to check whatever you want, **must return** `true` or `false`

#### DATA

Represents the values you want to check

### Response

#### DATA

If the check succes, returns the values.

#### ERROR

If the check fails, throws an Error with an message explaining what happened

## Usage

* Simple use

```js
const { structPrototype } = require('struct-prototype');

structPrototype('string')('It is fine');

/*
output: 'It is fine'
*/

structPrototype('number')('It is fine');

/*
output: Error. '"It is fine" is not number type'
*/
```
* Array structure

```js
const { structPrototype } = require('struct-prototype');

structPrototype(['string'])(['It is fine']);

/*
output: ['It is fine']
*/

structPrototype(['number'])(['It is fine']);

/*
output: Error. '"It is fine" is not number type'
*/

structPrototype(['Boolean'])('It is fine');

/*
output: Error. 'Data Structure is not an array'
*/

```
* Object structure

```js
const { structPrototype } = require('struct-prototype');

const myDataStructure = {
    name: 'string',
    age: 'number',
    isAdmin: 'Boolean'
}

structPrototype(myDataStructure)({
    name: 'Gastón',
    age: 34,
    isAdmin: true
});

/*
output: {
    name: 'Gastón',
    age: 34,
    isAdmin: true
}
*/

structPrototype(myDataStructure)({
    name: 'Gastón',
    age: '34',
    isAdmin: true
});

/*
output: Error. '"34" is not number type'
*/

structPrototype(myDataStructure)('It is fine');

/*
output: Error. 'Data Structure is not an object'
*/
```
* Custom Function

```js
const { structPrototype } = require('struct-prototype');

const isOverThirty = ({ age }) => age > 30;

structPrototype(isOverThirty)({
    name: 'Gastón',
    age: '34',
    isAdmin: true
});

/*
output: {
    name: 'Gastón',
    age: 34,
    isAdmin: true
}
*/

structPrototype(isOverThirty)({
    name: 'Gastón',
    age: 23,
    isAdmin: true
});

/*
output: Error. '"23" is not custom type'
*/

structPrototype(myDataStructure)('It is fine');

/*
output: Error. '"It is fine" is not custom type'
*/
```

