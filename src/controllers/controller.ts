import { Request, Response } from "express";
import { Bill, Transaction } from "../interface/main";
import helper from "../utils/helper";
import server from "../server";
import config from "../config/config";
const transactions: Transaction[] = [];
const balance = {};

const addTransactions = (req: Request, res: Response) => {
  try {
    const { payer, points, timestamp } = req.body;
    const transaction: Transaction = { payer, points, timestamp };
    helper.addTransactionHelper(transactions, transaction);
    return res.status(200).json({
      message: "added a transaction successfully!",
    });
  } catch (err) {
    return res.status(404).json({
      message: "invalid transaction, " + err.message,
    });
  }
};

const spendPoints = async (req: Request, res: Response) => {
  try {
    const { points } = req.body;
    const bills: Bill[] = helper.spendPointHelper(transactions, points, balance);
    return res.status(200).json(bills);
  } catch (err) {
    return res.status(404).json({
      message: "invalid spending points, " + err.message,
    });
  }
};

const getBalence = async (req: Request, res: Response) => {
  try {
    helper.getBalenceHelper(transactions, balance);
    return res.status(200).json(balance);
  } catch (err) {
    return res.status(404).json({
      message: "invalid balance " + err.message,
    });
  }
};

export default { addTransactions, spendPoints, getBalence };
