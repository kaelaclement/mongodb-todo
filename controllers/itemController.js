const Item = require('../models/itemModel');

exports.getItems = async (req, res) => {
	let itemsObjects = await Item.find().catch(err => res.render('index', { err: 'Something went wrong' }));
	let items = itemsObjects.map(item => item.description);
	res.render('index', { items });
}

exports.addItem = (req, res) => {
	if (req.body.todo) {
		Item.create({ description: req.body.todo })
			.then(success => res.redirect('/'))
			.catch(err => res.render('index', { err: 'Something went wrong' }));
	} else {
		res.render('index', { err: 'Please enter text' });
	}
}