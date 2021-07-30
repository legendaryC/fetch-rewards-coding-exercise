import express from "express";
import initialize from "./utils/initializer";
import routes from "./routes/router";
import logging from "./config/logging";
const bodyParser = require("body-parser");
import config from "./config/config";
import http from "http";
let app: express.Application = express();
const counter = () => {};
const NAMESPACE = "server";
/** initialize the app */
app = initialize(app);

/** Routes go here */
app.use("/api", routes);
const httpServer = http.createServer(app);
const server = httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
export default server;

// export default server;
