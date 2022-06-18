// Return an unresized image from the bucket

import AWS from "aws-sdk";

import { getExtension } from "./misc";

export default async (fileName: string, coldBucket: string, S3: AWS.S3) => {
    const fileExtension = getExtension(fileName);

    const uploaded = await S3.getObject({
        Bucket: coldBucket,
        Key: fileName,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/" + fileExtension,
            "Content-Disposition": `attachment; filename=${fileName}`,
        },
        body: uploaded.Body?.toString("base64"),
        isBase64Encoded: true,
    };
};
