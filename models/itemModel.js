const { Schema, model } = require('mongoose');

let item = new Schema({
	description: { type: String, required: true },
	completed: { type: Boolean, required: true, default: false },
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

item.statics.getByPriority = async function () {
	let itemsDocs = await this.find();
	let items = itemsDocs.map(item => item.toObject());
	items.sort((a, b) => a.priority - b.priority);
	return items;
}

item.statics.getByMostRecent = async function () {
	let itemsDocs = await this.find();
	let items = itemsDocs.map(item => item.toObject());
	items.sort((a, b) => a.dateAdded - b.dateAdded);
	return items;
}

item.statics.getByDefault = async function () {
	let itemsDocs = await this.find();
	let items = itemsDocs.map(item => item.toObject());
	return items;
}

module.exports = model('items', item);