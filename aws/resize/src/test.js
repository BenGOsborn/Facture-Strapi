require("dotenv").config();

const handler = require("./index");

(async () => {
    const event = {
        pathParameters: {
            file: "Torque_897543dd08.png",
        },
        queryStringParameters: {},
    };

    const result = await handler.handler(event);

    console.log(result);
})();
