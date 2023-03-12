require('dotenv').config();
const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
	connectToDb: (callback) => {
		MongoClient.connect(process.env.MONGO_CONNECTION_STRING).then((client) => {
			dbConnection = client.db(process.env.DATABASE);
			return callback();
		}).catch(err => {
			console.error(err);
			return callback(err);
		})
	},
	getDb: () => dbConnection
}