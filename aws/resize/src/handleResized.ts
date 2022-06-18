// Get the resized key from the bucket and return it

import AWS from "aws-sdk";

import { getExtension } from "./misc";

export default async (key: string, resizedBucket: string, S3: AWS.S3) => {
    const fileExtension = getExtension(key);

    const uploaded = await S3.getObject({
        Bucket: resizedBucket,
        Key: key,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/" + fileExtension,
            "Content-Disposition": `attachment; filename=${key}`,
        },
        body: uploaded.Body?.toString("base64"),
        isBase64Encoded: true,
    };
};
