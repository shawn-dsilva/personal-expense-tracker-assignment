interface Transaction {
    id?: number;
    type: "Income" | "Expense";
    amount: number;
    date: string; // ISO date string
    category: string;
}

interface User {
  first_name?: string;
  last_name?: string;
  username?: string;
}
export type { Transaction, User };