// Resize an image from the bucket and then upload it

export default async (
    fileName: string,
    key: string,
    dimensions: { width: number; height: number },
    coldBucket: string,
    S3: AWS.S3
) => {
    const uploaded = await S3.getObject({
        Bucket: coldBucket,
        Key: fileName,
    }).promise();

    // **** Now we need to manually resize this image

    const image = Sharp(uploaded.Body?.toString("binary")); //.resize(dimensions.width, dimensions.he) .toFormat("png") .toBuffer()

        .then((buffer) =>
            S3.putObject({
                Body: buffer,
                Bucket: BUCKET,
                ContentType: "image/png",
                Key: key,
            }).promise()

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
