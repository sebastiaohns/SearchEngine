const { indices } = require('./connection.js');

indices.create({
  index: 'news'
}, function(err, resp, status) {
  if(err) {
    console.log(err);
  }else {
    console.log("create", resp);
  }
});