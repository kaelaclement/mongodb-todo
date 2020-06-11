const { Schema, model } = require('mongoose');

let item = new Schema({
	description: { type: String, required: true },
	completed: { type: Boolean, default: false }
},
	{
		toObject: {
			virtuals: true
		}
	}
);

module.exports = model('items', item);