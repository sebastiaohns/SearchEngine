const client = require('./connection.js');

client.delete({
  index: 'news',
  id: '750af36ddb61be8df1f455b42c992d5351731648',
  type: 'noticias',
}, function(err, resp, status) {
  console.log(resp);
});