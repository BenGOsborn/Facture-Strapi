import AWS from "aws-sdk";

import handleNoSize from "./handleNoSize";
import handleResize from "./handleResize";
import handleResized from "./handleResized";

const S3 = new AWS.S3({
    apiVersion: "2006-03-01",
});

const COLD_BUCKET = process.env.COLD_BUCKET as string;
const RESIZED_BUCKET = process.env.RESIZED_BUCKET as string;
const ALLOWED_DIMENSIONS = new Set();

// Allowed dimensions format: "wxh,16x16,28x28"
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

        return handleResize(
            fileName,
            resizedKey,
            { width: split[0], height: split[1] },
            COLD_BUCKET,
            RESIZED_BUCKET,
            S3
        );
    }
};
