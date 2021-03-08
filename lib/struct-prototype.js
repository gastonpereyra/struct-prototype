'use strict';

const getType = structure => {

	const type = typeof structure;

	if(type === 'object' && Array.isArray(structure))
		return 'array';

	if(type === 'object' && !structure)
		return 'null';

	return type;
};

const struct = dataStruct => data => {

	switch(getType(dataStruct)) {

		case 'string':

			if(getType(data) !== dataStruct)
				throw new Error(`"${data}" is not ${dataStruct} type`);

			break;

		case 'object':

			if(getType(data) !== 'object')
				throw new Error(`${data} is not object`);

			Object.entries(data).forEach(([field, value]) => struct(dataStruct[field])(value));

			break;

		case 'array':

			if(!data.length)
				return false;

			data.forEach(item => struct(dataStruct[0])(item));

			break;

		case 'function':

			if(!dataStruct(data))
				throw new Error(`${data} is not custom type`);

			break;

		default: throw new Error(`"${data}" is not valid for ${dataStruct}`);
	}

	return data;
};

module.exports = struct;
