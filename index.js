const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGOCONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 3000;

const itemRouter = require('./routes/item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
	defaultLayout: 'layout',
	extname: 'hbs'
}));

app.set('view engine', '.hbs');

app.use('/', itemRouter);

app.listen(port, () => console.log(`listening on port ${port}`));