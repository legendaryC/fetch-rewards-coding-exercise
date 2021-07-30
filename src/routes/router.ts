import express from "express";
import controller from "../controllers/controller";

const router = express.Router();

router.post("/new-transactions", controller.addTransactions);
router.post("/spend-points", controller.spendPoints);
router.get("/get-balance", controller.getBalence);

export = router;
