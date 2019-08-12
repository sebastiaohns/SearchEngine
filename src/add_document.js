const fs = require('fs');

const client = require ('./connection.js');

var bulk = [];

var makebulk = function(documentList, callback) {
  for(var document in documentList) {
    bulk.push(
      {
        index: {
          _index: 'news',
          _type: 'noticias',
          _id: documentList[document].uuid,
        }
      },
      {
        'url': documentList[document].url,
        'title': documentList[document].title,
        'text': documentList[document].text,
        'published': documentList[document].published,
      }
    );
  }
  callback(bulk);
}

var indexall = function(madebulk, callback) {
  client.bulk({
    maxRetries: 5,
    index: 'news',
    type: 'noticias',
    body: madebulk,
  }, function(err, resp, status) {
    if (err) {
      console.log(err);
    } else {
      callback(resp.items);
    }
  })
}

async function addDocument() {
  for(var i = 1; i <= 10; i++) {
    fileName = '../data/news_00000';
    var number = Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2 }).format(i);
    fileName = fileName.concat(number);
    fileName = fileName.concat(".json");

    var articleRaw = await fs.readFileSync(fileName);
    var article = JSON.parse(articleRaw);

    makebulk(article, function(response){
      console.log(`Bulk ${number} content prepared`);
      indexall(response, function(response){
        console.log(response);
      })
    });
  }  
}

addDocument();