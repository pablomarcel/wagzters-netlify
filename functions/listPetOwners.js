const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    'neo4j+s://dd3f90d1.databases.neo4j.io',
    neo4j.auth.basic('neo4j', 'OWQoga9pbF-YcT1vGV27hxKGqJNqnhAtlPm2hst_uqQ')
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
