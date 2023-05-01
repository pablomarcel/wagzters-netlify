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

    const email = event.queryStringParameters.email;
    if (!email) {
        return { statusCode: 400, body: 'Email parameter is required.' };
    }

    const session = driver.session();
    try {
        const query = `
            MATCH (post:Post)-[:POST_ABOUT]->(pet:Pet)<-[:OWNED_BY]-(owner:PetOwner)-[:MANAGES]->(user:User {email: $email})
            RETURN post
            ORDER BY post.createdAt DESC
        `;
        const result = await session.run(query, { email });
        const posts = result.records.map((record) => record.get('post').properties);

        return { statusCode: 200, body: JSON.stringify(posts) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
    } finally {
        await session.close();
    }
};
