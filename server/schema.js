import { buildSchema } from 'graphql';

const types = `
    type Actor {
        id: ID!
        firstName: String!
        lastName: String!
        gender: String!
        picture: String!
        casts: [Cast]
    }
    type Movie {
        id: ID!
        name: String!
        year: Int!
        Casts: [Cast]        
    }
    type Cast {
        actorId: ID!
        movieId: ID!
        role: String!
        Actor: Actor
        Movie: Movie
    }
`;

const filters = `
    type ActorFilter {
        firstName: String
        lastName: String
        gender: String
    }
`;

const queries = `
    type Query {
        Actor(id: ID!): Actor
        Movie(id: ID!): Movie
        allActors(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ActorFilter): [Actor]
    }
`;

const schema = buildSchema(`${types}${filters}${queries}`);

export default schema;
