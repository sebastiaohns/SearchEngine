const { indices } = require('./connection.js');

indices.delete({
  index: 'news'
}, function(err,resp,status) {  
  console.log("delete",resp);
});