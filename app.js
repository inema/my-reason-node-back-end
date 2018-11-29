require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database')

app.get('/categories', (req, res, next) => {
  connection.query(
    "SELECT * FROM categories c ORDER BY c.order", (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  )
});

app.get('/facts/:category', (req, res, next) => {
  const query;
  if (req.params.category === 'All'){
    query = "SELECT * FROM facts"
  } else {
    query = "SELECT * FROM facts f WHERE f.category = '" + req.params.category + "'"
  }
  connection.query(
    query, (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  )
});

app.set('port', process.env.PORT || 3000);
app.listen(3000);
