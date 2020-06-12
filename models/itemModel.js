const { Schema, model } = require('mongoose');

let item = new Schema({
	description: { type: String, required: true },
	completed: { type: Boolean, default: false },
	dateAdded: { type: Date, required: true },
	colour: { type: String, required: true, default: 'white' },
	priority: { type: Number }
},
	{
		toObject: {
			virtuals: true
		}
	}
);

module.exports = model('items', item);