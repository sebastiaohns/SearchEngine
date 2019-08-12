const client = require('../src/connection.js');

const search = function search(index, body) {
  return client.search({ index: index, body: body });
};

module.exports = function searchData() {
  let body = {
    size: 4,
    from: 0,
    query: {
      match_all: {}
    }
	};
	
	search('library', body)
	.then(results => {
		console.log(`found ${results.hits.total} items in ${results.took}ms`);
		console.log(`returned journal: `);
		results.hits.hits.forEach(
			(hit, index) => console.log(
				hit._source.journal
			)
		)
	})
	.catch(console.error);
};