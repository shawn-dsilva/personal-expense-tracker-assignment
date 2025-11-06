import { useGetAllTransactions } from '@/hooks/useGetTransactionsList';
import React from 'react'

const TransactionList = () => {
    const { data: transactions, isLoading, isError } = useGetAllTransactions();
    return (
        <div>
            <h2>Transaction List</h2>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading transactions</p>}
            {transactions && (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>{transaction.type} - {transaction.amount} on {transaction.date}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TransactionList