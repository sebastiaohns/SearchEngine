const client = require('./connection.js');

client.count({
  index: 'news',
  type: 'noticias',
}, function(err, resp, status) {
  console.log("noticias", resp);
});