import mysql from 'mysql';

import dbConfig from './config/db';

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	const db = mysql.createConnection(dbConfig);

	db.connect((err, res) => {
		if(err) throw err;
		console.log('mysql connected succeed!');
	});

	callback(db);
}