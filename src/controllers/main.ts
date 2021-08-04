import { Request, Response } from "express";
import { Bill, Transaction } from "../interface/main";
import helper from "../utils/helper";
import server from "../server";
import config from "../config/config";

//  set the two global variables
const transactions: Transaction[] = [];
const balance = {};

const addTransactions = (req: Request, res: Response) => {
  try {
    const { payer, points, timestamp } = req.body;
    // validate the parameters
    let valid_timestamp = new Date(timestamp).toISOString();
    if (typeof payer !== "string" || typeof points !== "number") {
      throw "invalid parameters";
    }
    // create & add a new transaction
    const transaction: Transaction = { payer, points, timestamp: valid_timestamp };
    helper.addTransactionHelper(transactions, transaction, balance);
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
    // validate the parameters
    if (typeof points !== "number") {
      throw "invalid parameters";
    }
    // generate bills & modify the transactions if necessary
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
    return res.status(200).json(balance);
  } catch (err) {
    return res.status(404).json({
      message: "invalid balance " + err.message,
    });
  }
};

export default { addTransactions, spendPoints, getBalence };
