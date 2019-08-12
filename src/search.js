const client = require('./connection.js');

client.search({
    index: 'news',
    type: 'noticias',
    body: {
      query: {
        match: {
          "title": "jovem"
        }
      },
    }
  }, function (error, response, status) {
  if (error) {
    console.log("search error: " + error);
  } else {
    console.log("--- Resposta ---");
    console.log(response);
    console.log("--- Hits ---");
    response.hits.hits.forEach(function(hit) {
      console.log(hit);
    })
  }
});