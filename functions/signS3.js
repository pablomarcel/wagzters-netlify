//wagzters/functions/signS3.js:

const AWS = require('aws-sdk');
const uuidv4 = require('uuid').v4;

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION,
});

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const body = JSON.parse(event.body);
    const { fileName, fileType } = body;
    const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${fileName}.${uuidv4()}`,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read',
    };

    try {
        const signedRequest = await s3.getSignedUrlPromise('putObject', s3Params);
        const url = `https://${s3Params.Bucket}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${s3Params.Key}`;

        return {
            statusCode: 200,
            body: JSON.stringify({
                signedRequest,
                url,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while signing the S3 URL.' }),
        };
    }
};
