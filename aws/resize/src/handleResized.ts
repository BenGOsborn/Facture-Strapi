// Get the resized key from the bucket and return it

export default async (key: string, bucket: string, S3: AWS.S3) => {
    const uploaded = await S3.getObject({
        Bucket: bucket,
        Key: key,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/jpg",
            "Content-Disposition": `attachment; filename=${key}`,
        },
        body: uploaded.Body?.toString("base64"),
        isBase64Encoded: true,
    };
};
