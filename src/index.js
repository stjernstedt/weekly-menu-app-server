require('dotenv').config();
const express = require('express')
const app = express()

const { MongoClient } = require('mongodb');
const PORT = process.env.PORT;
const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);


app.get('/items/:my_item', (req, res) => {
	console.log('test post');
	res.send('testing');
})

client.connect(
	err => {
		if (err) { console.error(err); return false }
		app.listen(PORT, () => {
			console.log('listening for requests');
		})
	})

// app.listen(process.env.PORT || 3000)