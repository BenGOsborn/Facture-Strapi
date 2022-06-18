module.exports = ({ env }) => {
    const imageHost = env("AWS_IMAGE_LOCATION", "").split("/")[2];

    return [
        "strapi::errors",
        // "strapi::security",
        {
            name: "strapi::security",
            config: {
                contentSecurityPolicy: {
                    directives: {
                        "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
                        "img-src": ["'self'", "data:", "cdn.jsdelivr.net", "strapi.io", imageHost],
                    },
                },
            },
        },
        "strapi::cors",
        "strapi::poweredBy",
        "strapi::logger",
        "strapi::query",
        "strapi::body",
        "strapi::session",
        "strapi::favicon",
        "strapi::public",
    ];
};
