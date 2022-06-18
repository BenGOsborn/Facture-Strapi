(async () => {
    const { handler } = require("./index");

    process.env.COLD_BUCKET = "facture-files-cold";
    process.env.RESIZED_BUCKET = "facture-files";
    process.env.ALLOWED_DIMENSIONS = "100x100,200x200,500x500";

    const event = {
        pathParameters: {
            file: "Torque_897543dd08.png",
        },
        queryStringParameters: {},
    };

    const result = await handler(event);

    console.log(result);
})();
