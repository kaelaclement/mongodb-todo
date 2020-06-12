const Item = require('../models/itemModel');

exports.getItems = async (req, res) => {
	let items = await Item.getByDefault();
	if (items.length == 0) {
		res.render('index', { err: 'Add items to your list!' });
	} else {
		res.render('index', { items });
	}
}

exports.getRecent = async (req, res) => {
	let items = await Item.getByMostRecent();
	if (items.length == 0) {
		res.render('index', { err: 'Add items to your list!' });
	} else {
		res.render('index', { items });
	}
}

exports.getPriorities = async (req, res) => {
	let items = await Item.getByPriority();
	if (items.length == 0) {
		res.render('index', { err: 'Add items to your list!' });
	} else {
		res.render('index', { items });
	}
}

exports.addItem = (req, res) => {
	// description: { type: String, required: true },
	// colour: { type: String, required: true, default: 'white' },
	// priority: { type: Number }
	// completed: { type: Boolean, default: false },
	// dateAdded: { type: Date, required: true },
	let { description, colour, priority } = req.body;

	if (description) {
		Item.create({
			description: description,
			colour: colour,
			priority: priority,
			dateAdded: new Date()
		})
			.then(success => res.redirect('/'))
			.catch(err => res.render('index', { err: 'Something went wrong' }));
	} else {
		res.render('index', { err: 'Please enter text' });
	}
}

exports.deleteItem = (req, res) => {
	Item.findByIdAndDelete(req.body.itemId)
		.then(success => res.redirect('/'))
		.catch(err => res.render('index', { err: 'Something went wrong' }));
}

exports.toggleCompleted = (req, res) => {
	let newStatus = !(req.body.completed === 'true');
	Item.findByIdAndUpdate(req.body.itemId, { completed: newStatus })
		.then(success => res.redirect('/'))
		.catch(err => res.render('index', { err: 'Something went wrong' }));
}