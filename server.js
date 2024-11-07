/* eslint-disable quotes */
import hapi from "@hapi/hapi";
import routes from "./routes.js";

const init = async () => {
    const server = hapi.server({
        port: 5000,
        host: "localhost",
        routes: {
            cors: {
                origin: ["*"]
            }
        }
    });

    server.route(routes);

    await server.start();

    console.log("Server is running at " + server.info.uri);
};

init();