import express from "express";
import logging from "../config/logging";
const bodyParser = require("body-parser");
import config from "../config/config";

const NAMESPACE = "server";

const initialize = (app: express.Application) => {
  /** Log the request */
  app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on("finish", () => {
      /** Log the res */
      logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
  });

  /** Parse the body of the request */
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  /** Rules of our API */
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }

    next();
  });

  return app;
};

export default initialize;
