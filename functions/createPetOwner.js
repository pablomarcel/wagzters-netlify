//wagzters/functions/createPetOwner.js:

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

    const userEmail = user.email;
    const body = JSON.parse(event.body);
    const { name } = body;

    const session = driver.session();
    try {
        const result = await session.writeTransaction(async (tx) => {
            const findUserQuery = `
                MERGE (user:User {email: $email})
                ON CREATE SET user.id = $userId, user.name = $name
            `;
            await tx.run(findUserQuery, { email: userEmail, userId: uuidv4(), name });

            const createPetOwnerQuery = `
                MATCH (user:User {email: $email})
                CREATE (owner:PetOwner {id: $ownerId, name: $name, email: $email})-[:MANAGES]->(user)
                RETURN owner
            `;
            const response = await tx.run(createPetOwnerQuery, { email: userEmail, ownerId: uuidv4(), name });
            return response.records[0].get('owner').properties;
        });

        return { statusCode: 201, body: JSON.stringify(result) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'An error occurred while creating the pet owner.' }) };
    } finally {
        await session.close();
    }
};

