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

interface AmountFilter {
    min: number;
    max:number;
}

interface DateFilter {
    from: string;
    to:string;
}

interface TransactionFilters {
    category?: string;
    dateRange?: DateFilter;
    amounts?: AmountFilter;
}


export type { Transaction, User, TransactionFilters, AmountFilter, DateFilter };