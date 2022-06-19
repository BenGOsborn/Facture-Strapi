// Get the resized key from the bucket and return it

import { APIGatewayProxyResult } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";

import { getExtension } from "./misc";

export default async (key: string, resizedBucket: string, s3: S3): Promise<APIGatewayProxyResult> => {
    const fileExtension = getExtension(key);

    const uploaded = await s3.getObject({ Bucket: resizedBucket, Key: key }).promise();

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/" + fileExtension, "Content-Disposition": `attachment; filename=${key}` },
        body: uploaded.Body?.toString("base64") || "",
        isBase64Encoded: true,
    };
};
