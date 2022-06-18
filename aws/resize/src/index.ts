import AWS from "aws-sdk";

import handleNoSize from "./handleNoSize";
import handleResized from "./handleResized";

const S3 = new AWS.S3({
    apiVersion: "2006-03-01",
});

const COLD_BUCKET = process.env.COLD_BUCKET as string;
const RESIZED_BUCKET = process.env.RESIZED_BUCKET as string;
const ALLOWED_DIMENSIONS = new Set();

// Allowed dimensions format: "16x16,28x28"
if (process.env.ALLOWED_DIMENSIONS) {
    const dimensions = process.env.ALLOWED_DIMENSIONS.split(/\s*,\s*/);
    dimensions.forEach((dimension) => ALLOWED_DIMENSIONS.add(dimension));
}

exports.handler = async (event) => {
    const fileName = event.pathParameters.file as string;
    const size = event.queryStringParameters.size as string | undefined;

    // If there is no size defined return image from the cold bucket
    if (!size) return handleNoSize(fileName, COLD_BUCKET, S3);

    if (ALLOWED_DIMENSIONS.size > 0 && !ALLOWED_DIMENSIONS.has(size))
        return {
            statusCode: "403",
            headers: {},
            body: "",
        };

    const resizedKey = size + "." + fileName;

    try {
        return handleResized(resizedKey, RESIZED_BUCKET, S3);
    } catch {
        const split = size.split("x");
        const width = split[0];
        const height = split[1];

        // Check if the image matches in the bucket
        const uploaded = await S3.getObject({
            Bucket: COLD_BUCKET,
            Key: fileName,
        }).promise();
    }

    Sharp(data.Body)
        .resize(width, height)
        .toFormat("png")
        .toBuffer()

        .then((buffer) =>
            S3.putObject({
                Body: buffer,
                Bucket: BUCKET,
                ContentType: "image/png",
                Key: key,
            }).promise()
        )
        .then(() =>
            callback(null, {
                statusCode: "301",
                headers: { location: `${URL}/${key}` },
                body: "",
            })
        )
        .catch((err) => callback(err));

    return {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda!"),
        isBase64Encoded: true,
    };
};
