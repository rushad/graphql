import { appInstance } from './pages/App';

const url = process.env.GRAPHQL_ENDPOINT || '/graphql';

export async function queryGraphQL(query, variables) {
    const timeStart = Date.now();

    const queryObject = {
        query,
        variables
    };
    const queryString = JSON.stringify(queryObject);
    appInstance.setStats({ query, sent: queryString.length });

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: queryString
    });

    const result = await response.json();

    appInstance.setStats({ time: Date.now() - timeStart, received: JSON.stringify(result).length });

    return result;
}
