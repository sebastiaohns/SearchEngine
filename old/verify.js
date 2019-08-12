const { Client } = require('elasticsearch');

const client = new Client({
  host: 'localhost:9200',
  log: 'error'
});

function indices() {
	return client.cat.indices({ v: true })
	.then(console.log)
	.catch(err => console.error(`Error connecting to the es client: ${err}`));
}

module.exports = function verify() {
	console.log(`elasticsearch indices formation: `);
	indices();
}