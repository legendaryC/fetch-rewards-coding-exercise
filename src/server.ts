import express from "express";
import initialize from "./utils/initializer";
import routes from "./routes/main";
import logging from "./config/logging";
import config from "./config/config";
import http from "http";

const NAMESPACE = "server";

/** initialize the app */
const app = initialize(express());

/** Routes go here */
app.use("/api", routes);

const httpServer = http.createServer(app);
const server = httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

// export default server;
export default server;
