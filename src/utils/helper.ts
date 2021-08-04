import { Transaction, Bill } from "../interface/main";

const addTransactionHelper = (transactions: Transaction[], transaction: Transaction, balance: any) => {
  const N = transactions.length;
  balance[transaction.payer] = (balance[transaction.payer] || 0) + transaction.points;
  if (N === 0) {
    transactions.push(transaction);
    return;
  }
  for (let i = 0; i < N; i++) {
    if (transactions[i].timestamp > transaction.timestamp) {
      transactions.splice(i, 0, transaction);
      return;
    }
  }
  transactions.splice(N - 1, 0, transaction);
  console.log(balance);
};

const spendPointHelper = (transactions: Transaction[], pointAmount: number, balance: any) => {
  let bills: Bill[] = [];
  while (transactions.length) {
    if (pointAmount > 0) {
      const transaction: Transaction | undefined = transactions.shift();

      if (transaction) {
        let bPints: number = 0;
        bPints = Math.min(pointAmount, transaction.points);
        let bill: Bill = { payer: transaction.payer, points: bPints };
        // To add the bill to bills list for response
        addBill(bills, bill);
        // To update the balance
        balance[transaction.payer] -= bPints;
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

export default { addTransactionHelper, spendPointHelper };
