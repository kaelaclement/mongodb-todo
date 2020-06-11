const Item = require('../models/itemModel');

exports.getItems = async (req, res) => {
	let itemsDoc = await Item.find().catch(err => res.render('index', { err: 'Something went wrong' }));
	let items = itemsDoc.map(item => {
		return { id: item.id, description: item.description, completed: item.completed }
	})
	if (items.length == 0) {
		res.render('index', { err: 'Add items to your list!' });
	} else {
		res.render('index', { items });
	}
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

exports.deleteItem = (req, res) => {
	Item.findByIdAndDelete(req.body.itemId)
		.then(success => res.redirect('/'))
		.catch(err => res.render('index', { err: 'Something went wrong' }));
}

exports.toggleCompleted = (req, res) => {
	let newStatus = !(req.body.completed === 'true');
	console.log(newStatus);
	Item.findByIdAndUpdate(req.body.itemId, { completed: newStatus })
		.then(success => res.redirect('/'))
		.catch(err => res.render('index', { err: 'Something went wrong' }));
}