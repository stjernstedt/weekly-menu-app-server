require('dotenv').config();
const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

// init app & middleware
const app = express();

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// db connection
let db;
connectToDb((err) => {
	if (err) console.log(err);
	if (!err) {
		app.listen(process.env.PORT, () => {
			console.log('listening on port ' + process.env.PORT);
		})
		db = getDb();
	}
});

app.get('/dishes', (req, res) => {
	db.collection('dishes')
		.find({})
		.sort({ title: 1 })
		.toArray()
		.then(dishes => {
			res.status(200).json(dishes);
		})
		.catch(() => {
			res.status(500).json({ error: 'Could not fetch documents' })
		});
})

app.get('/dishes/:ingredient', (req, res) => {
	db.collection('dishes')
		.find({ ingredients: req.params.ingredient })
		.toArray()
		.then(items => {
			res.status(200).json(items)
		})
		.catch(() => {
			res.status(500).json({ error: 'Could not fetch documents' })
		})
})

// app.get('/dishes/:id', (req, res) => {
// 	db.collection('dishes')
// 		.findOne({ _id: new ObjectId(req.params.id) })
// 		.then(doc => {
// 			res.status(200).json(doc);
// 		})
// 		.catch(err => {
// 			res.status(500).json({ error: 'could not fetch document' });
// 		})
// })