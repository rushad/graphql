import fs from 'fs';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import jsonGraphqlExpress from 'json-graphql-server';

import schema from './schema';

import db from './db';

const app = express();

const resolvers = {
    hello: args => `Hello ${args.name}`
};

app.use('/graphql', jsonGraphqlExpress(db));

app.use('/graphql1', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}));

app.post('/source/', express.json(), (req, res) => {
    res.send(fs.readFileSync(req.body.file));
});

app.listen(3001);

// eslint-disable-next-line
console.log('GraphQL server is running on http://localhost:3001/graphql');