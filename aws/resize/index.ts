import AWS from "aws-sdk";
import Sharp from "sharp";

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
    const fileName = event.pathParameters.file;
    const size = event.queryStringParameters.size;

    const split = size.split("x");
    const width = split[0];
    const height = split[1];

    // **** We should also have some sort of override if there is no size parameter attached to the request - otherwise we will use it for everything

    if (ALLOWED_DIMENSIONS.size > 0 && !ALLOWED_DIMENSIONS.has(size))
        return {
            statusCode: "403",
            headers: {},
            body: "",
        };

    let obj: any = null;

    // Try and find the file
    const resizedKey = size + "." + fileName;

    try {
        try {
            // Search the resized bucket for the file
            const uploaded = await S3.getObject({
                Bucket: RESIZED_BUCKET,
                Key: resizedKey,
            }).promise();

            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/jpg",
                    "Content-Disposition": `attachment; filename=${resizedKey}`,
                },
                body: uploaded.Body?.toString("base64"),
                isBase64Encoded: true,
            };
        } catch {
            // Check if the image matches in the bucket
            const uploaded = await S3.getObject({
                Bucket: COLD_BUCKET,
                Key: fileName,
            }).promise();
        }
    } catch {
        return {
            statusCode: "404",
            headers: {},
            body: "",
        };
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
