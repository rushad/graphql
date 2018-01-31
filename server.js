const express = require('express');
const jsonGraphqlExpress = require('json-graphql-server').jsonGraphqlExpress;

const db = require('./db.js');

const app = express();

app.use('/graphql', jsonGraphqlExpress(db));
app.listen(3001);

console.log('GraphQL server is running on http://localhost:3001/graphql');