export interface Transaction {
  payer: string;
  points: number;
  timestamp: string;
}

export interface Bill {
  payer: string;
  points: number;
}
