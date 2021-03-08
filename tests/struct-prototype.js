'use strict';

const assert = require('assert');

const struct = require('../lib/struct-prototype');

describe('struct-prototype', () => {

	const samplesScalarTruthy = [
		['string', 'a simple sample string field'],
		['number', 16],
		['boolean', true],
		['object', { field: 'something' }],
		['array', ['something']]
	];

	const samplesScalarFalsy = [
		['string', ''],
		['number', 0],
		['boolean', false],
		['object', {}],
		['array', []],
		['null', null]
	];

	const samplesScalarInvalid = [
		['string', [1, true, ['invalid'], { invalid: 'invalid' }, null]],
		['number', ['invalid', true, ['invalid'], { invalid: 'invalid' }, null]],
		['boolean', [1, 'invalid', ['invalid'], { invalid: 'invalid' }, null]],
		['object', [1, true, ['invalid'], 'invalid', null]],
		['array', [1, true, 'invalid', { invalid: 'invalid' }, null]],
		['null', [1, true, ['invalid'], { invalid: 'invalid' }, 'invalid']]
	];

	context('When it check basic scalar types', () => {

		samplesScalarTruthy.forEach(([type, sample]) => it(`Should return values if ${type} is passed as structure with truthy valid sample`, () => {
			assert.strictEqual(struct(type)(sample), sample);
		}));

		samplesScalarFalsy.forEach(([type, sample]) => it(`Should return values if ${type} is passed as structure with falsy valid sample`, () => {
			assert.strictEqual(struct(type)(sample), sample);
		}));

		// eslint-disable-next-line max-len
		samplesScalarInvalid.forEach(([type, samples]) => samples.forEach(sample => it(`Should throw if ${type} is passed as structure with invalid sample ${typeof sample}`,
			() => assert.throws(() => struct(type)(sample))
		)));
	});

	context('When it check basic scalar types in arrays', () => {

		samplesScalarTruthy.forEach(([type, sample]) => it(`Should return values if truthy ${type} is passed as structure`, () => {
			assert.deepStrictEqual(struct([type])([sample]), [sample]);
		}));

		samplesScalarFalsy.forEach(([type, sample]) => it(`Should return values if falsy ${type} is passed as structure`, () => {
			assert.deepStrictEqual(struct([type])([sample]), [sample]);
		}));

		// eslint-disable-next-line max-len
		samplesScalarInvalid.forEach(([type, samples]) => samples.forEach(sample => it(`Should throw if ${type} is passed as structure with invalid sample ${typeof sample}`,
			() => assert.throws(() => struct([type])([sample]))
		)));
	});
});
