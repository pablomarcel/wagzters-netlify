const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');

dotenv.config();

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

exports.handler = async (event, context) => {
    const { ownerEmail } = JSON.parse(event.body);

    const session = driver.session();
    try {
        const checkOwnerQuery = `
      MERGE (owner:PetOwner {email: $email})
      RETURN owner
    `;

        const result = await session.run(checkOwnerQuery, { email: ownerEmail });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Pet owner checked and created if not exists' }),
        };
    } catch (error) {
        console.error('Error checking and creating pet owner', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error checking and creating pet owner' }),
        };
    } finally {
        session.close();
    }
};
