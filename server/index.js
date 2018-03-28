import fs from 'fs';
import path from 'path';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: makeExecutableSchema({
        typeDefs: fs.readFileSync('server/schema.gql').toString(),
        resolvers
    }),
    graphiql: true
}));

app.post('/source/', express.json(), (req, res) => {
    res.send(fs.readFileSync(req.body.file));
});

app.use(express.static(path.join(__dirname, '../build')));

app.listen(PORT);

console.log('Server on port', PORT);
