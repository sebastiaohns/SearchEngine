const client = require('../src/connection.js');

const search = function search(index, body) {
  return client.search({ index: index, body: body});
};

module.exports = function searchTerm() {
  let body = {
    size: 4,
    from: 0,
    query: {
      match: {
        body: {
          query: 'exercitation',
          minimum_should_match: 2,
          fuzziness: 2
        }
      }
    }
  };

  console.log(`retrieving documents whose journal matches '${body.query.match.body.query}' (displaying ${body.size} items at a time)...`);
  search('library', body)
  .then(results => {
    console.log(`found ${results.hits.total} items in ${results.took}ms`);
    if (results.hits.total > 0) console.log(`returned journals:`);
    results.hits.hits.forEach(hit => console.log(hit._source.journal));
  })
  .catch(console.error);
};