const url = process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

export async function queryGraphQL(query, variables) {
    const queryObject = {
        query,
        variables
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queryObject)
    });
    return await response.json();
}
