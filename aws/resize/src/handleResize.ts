// Resize an image from the bucket and then upload it

const sharp = require("sharp");

module.exports = async (
    fileName,
    key,
    dimensions,
    coldBucket,
    resizedBucket,
    S3
) => {
    const uploaded = await S3.getObject({
        Bucket: coldBucket,
        Key: fileName,
    }).promise();

    const image = sharp(Buffer.from(uploaded.Body.toString()))
        .resize(dimensions.width, dimensions.height)
        .toFormat("jpg")
        .toBuffer();

    S3.upload({
        Body: image,
        Bucket: resizedBucket,
        Key: key,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/jpg",
            "Content-Disposition": `attachment; filename=${key}`,
        },
        body: uploaded.Body.toString("base64"),
        isBase64Encoded: true,
    };
};
