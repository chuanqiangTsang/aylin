export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	const db = 'DBInstance'
	callback(db);
}