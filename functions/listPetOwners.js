require('dotenv').config();
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const session = driver.session();
    try {
        const result = await session.run('MATCH (owner:PetOwner) RETURN owner');
        const owners = result.records.map((record) => record.get('owner').properties);

        return { statusCode: 200, body: JSON.stringify(owners) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
    } finally {
        await session.close();
    }
};
