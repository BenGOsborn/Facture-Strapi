module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: "aws-s3",
            providerOptions: {
                accessKeyId: env("AWS_ACCESS_KEY_ID"),
                secretAccessKey: env("AWS_ACCESS_SECRET"),
                region: env("AWS_REGION"),
                params: {
                    Bucket: env("AWS_BUCKET_NAME"),
                },
                imageLocation: env("AWS_IMAGE_LOCATION"),
            },
        },
    },
    search: {
        enabled: true,
        config: {
            provider: "algolia",
            providerOptions: {
                apiKey: env("ALGOLIA_PROVIDER_ADMIN_API_KEY"),
                applicationId: env("ALGOLIA_PROVIDER_APPLICATION_ID"),
            },
            contentTypes: [{ name: "api::manufacturer.manufacturer" }],
        },
    },
});
