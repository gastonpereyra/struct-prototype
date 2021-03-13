'use strict';

const assert = require('assert');

const { structPrototype: struct } = require('../lib');

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

		samplesScalarTruthy.forEach(([type, sample]) => it(`Should return values if truthy ${type} is passed as structure for the every item`, () => {
			assert.deepStrictEqual(struct({ someField: type })({ someField: sample }), { someField: sample });
		}));

		samplesScalarFalsy.forEach(([type, sample]) => it(`Should return values if falsy ${type} is passed as structure for the every item`, () => {
			assert.deepStrictEqual(struct({ someField: type })({ someField: sample }), { someField: sample });
		}));

		// eslint-disable-next-line max-len
		samplesScalarInvalid.forEach(([type, samples]) => samples.forEach(sample => it(`Should throw if ${type} is passed as structure for the every item with invalid sample ${typeof sample}`,
			() => assert.throws(() => struct({ someField: type })({ someField: sample }))
		)));

		it('Should throw if data is not an array',	() => assert.throws(() => struct(['string'])('invalid')));
	});

	context('When it check basic scalar types in object', () => {

		samplesScalarTruthy.forEach(([type, sample]) => it(`Should return values if truthy ${type} is passed as structure in a field`, () => {
			assert.deepStrictEqual(struct([type])([sample]), [sample]);
		}));

		samplesScalarFalsy.forEach(([type, sample]) => it(`Should return values if falsy ${type} is passed as structure ina a field`, () => {
			assert.deepStrictEqual(struct([type])([sample]), [sample]);
		}));

		// eslint-disable-next-line max-len
		samplesScalarInvalid.forEach(([type, samples]) => samples.forEach(sample => it(`Should throw if ${type} is passed as structure in a field with invalid sample ${typeof sample}`,
			() => assert.throws(() => struct([type])([sample]))
		)));

		it('Should throw if field in object has no structure to check',	() => assert.throws(() => struct({ someField: 'string' })({ invalid: 'invalid' })));
		it('Should throw if data is not an object',	() => assert.throws(() => struct({ someField: 'string' })('invalid')));
	});

	context('When it check types using custom function', () => {

		const isFunType = data => data === 'Fun';

		it('Should return values if custom Function returns true', () => assert.strictEqual(struct(isFunType)('Fun'), 'Fun'));

		it('Should throw if custom Function returns false',	() => assert.throws(() => struct(isFunType)('not fun')));
	});
});
