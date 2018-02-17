import db from './db';

function comparator(a, b, descending) {
    return (descending ? (a > b) : (a < b)) ? -1 : 1;
}

function filtrator(element, filter) {
    return !filter || !Object.keys(filter).some(key => !element[key].startsWith(filter[key]));
}

function find(collection, page = 0, perPage, sortField, descending, filter) {
    const filtered = collection.filter(element => filtrator(element, filter));
    const sorted = sortField ? filtered.sort((a, b) =>
        comparator(a[sortField], b[sortField], descending)) : filtered;
    return perPage ? sorted.slice(page * perPage, (page * perPage) + perPage) : sorted;
}

function count(collection, filter) {
    return collection.filter(element => filtrator(element, filter)).length;
}

const resolvers = {
    Query: {
        actor: (_, { id }) => db.actors.find(actor => actor.id === id),
        movie: (_, { id }) => db.movies.find(movie => movie.id === id),
        actors: (_, { page, perPage, sortField, descending, filter }) =>
            find(db.actors, page, perPage, sortField, descending, filter),
        totalActors: (_, { filter }) => count(db.actors, filter),
        movies: (_, { page, perPage, sortField, descending, filter }) =>
            find(db.movies, page, perPage, sortField, descending, filter),
        totalMovies: (_, { filter }) => count(db.movies, filter)
    },
    Actor: {
        casts: ({ id }) => db.casts.filter(cast => cast.actorId === id)
    },
    Movie: {
        casts: ({ id }) => db.casts.filter(cast => cast.movieId === id)
    },
    Cast: {
        actor: ({ actorId }) => db.actors.find(actor => actor.id === actorId),
        movie: ({ movieId }) => db.movies.find(movie => movie.id === movieId)
    }
};

export default resolvers;
