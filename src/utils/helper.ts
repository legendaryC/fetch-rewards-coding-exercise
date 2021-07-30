import { Transaction, Bill } from "../interface/main";

const addTransactionHelper = (transactions: Transaction[], transaction: Transaction) => {
  const N = transactions.length;
  if (N === 0) {
    // console.log("bill132143");
    transactions.push(transaction);
    // console.log("bill132143", transactions);
    return;
  }
  for (let i = 0; i < N; i++) {
    if (transactions[i].timestamp > transaction.timestamp) {
      transactions.splice(i, 0, transaction);

      return;
    }
  }
  transactions.splice(N - 1, 0, transaction);
  // console.log("bill", transactions);
};

const addBill = (bills: Bill[], bill: Bill) => {
  let found = false;
  bills.forEach((b) => {
    if (b.payer === bill.payer) {
      b.points -= bill.points;
      found = true;
    }
  });
  if (!found) {
    bills.push({ payer: bill.payer, points: -bill.points });
  }
};

const spendPointHelper = (transactions: Transaction[], pointAmount: number, balance: any) => {
  let bills: Bill[] = [];

  while (transactions.length) {
    if (pointAmount > 0) {
      const transaction: Transaction | undefined = transactions.shift();

      if (transaction) {
        if (!(transaction.payer in balance)) {
          balance[transaction.payer] = 0;
        }
        if (balance[transaction.payer] != 0) {
          balance[transaction.payer] = 0;
        }
        let bPints: number = 0;
        bPints = Math.min(pointAmount, transaction.points);
        let bill: Bill = { payer: transaction.payer, points: bPints };
        // console.log(bill);
        addBill(bills, bill);
        if (pointAmount < transaction.points) {
          transaction.points -= bPints;
          transactions.unshift(transaction);
        }
        pointAmount -= bPints;
      }
    } else {
      break;
    }
  }

  return bills;
};

const getBalenceHelper = (transactions: Transaction[], balance: any) => {
  // let balance: any = {};
  transactions.forEach((trans) => {
    if (trans.payer in balance) {
      balance[trans.payer] += trans.points;
    } else {
      balance[trans.payer] = trans.points;
    }
  });
  return balance;
};

export default { addTransactionHelper, spendPointHelper, getBalenceHelper };
