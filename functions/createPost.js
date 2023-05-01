// wagzters/functions/createPost.js

require('dotenv').config();
const neo4j = require('neo4j-driver');
const { v4: uuidv4 } = require('uuid');

// Replace with your Neo4j Aura connection credentials
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const user = context.clientContext.user;
    if (!user) {
        return { statusCode: 401, body: 'Unauthorized' };
    }

    const body = JSON.parse(event.body);
    const { petId, content, imageURL, ownerEmail } = body;

    const session = driver.session();
    try {
        const result = await session.writeTransaction(async (tx) => {
            const query = `
                MATCH (pet:Pet {id: $petId})
                MATCH (owner:PetOwner {email: $ownerEmail})
                CREATE (post:Post {id: $id, content: $content, imageURL: $imageURL, createdAt: datetime()})
                CREATE (post)-[:POST_ABOUT]->(pet)
                CREATE (owner)-[:OWNER_OF_POST]->(post)
                RETURN post
            `;
            const params = { id: uuidv4(), petId, content, imageURL, ownerEmail };
            const response = await tx.run(query, params);
            return response.records[0].get('post').properties;
        });

        return { statusCode: 201, body: JSON.stringify(result) };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while creating the post.', details: error.message }),
        };
    } finally {
        await session.close();
    }
};
