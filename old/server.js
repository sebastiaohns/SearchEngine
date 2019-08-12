const express = require('express');
const { Client } = require('elasticsearch');
const fs = require('fs');
const app = express();

const PORT = 5000;

const verify = require('./verify');
const searchData = require('./search');
const searchTerm = require('./search_term');
const client = require('../src/connection.js');

client.ping({ requestTimeout: 30000 }, (error) => {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('Everything is ok');
  }
});

const bulkIndex = function bulkIndex(index, type, data) {
  let bulkBody = [];

  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.id
      }
    });

    bulkBody.push(item);
  });

  client.bulk({ body: bulkBody })
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(
        `Successfully indexed ${data.length - errorCount}
        out of ${data.length} items`
        );
    })
    .catch(console.err);
};

async function indexData() {
  const articlesRaw = await fs.readFileSync('./data.json');
  const articles = JSON.parse(articlesRaw);
  console.log(`${articles.length} items parsed from data file`);
  bulkIndex('library', 'article', articles);
};

// indexData();
// verify();
// searchData();
searchTerm();

app.listen(PORT, () => {
  console.log('Server is running on PORT: ', PORT);
});