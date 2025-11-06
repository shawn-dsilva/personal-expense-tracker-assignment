import { useGetAllTransactions } from '@/hooks/useGetTransactionsList';
import React from 'react'

const TransactionList = () => {
    const { data: transactions, isLoading, isError } = useGetAllTransactions();
    return (
        <div className="flex w-lg gap-2 flex-col mx-auto p-4 border-dashed border-2 border-gray-300 rounded-md my-4">
            <h2 className='text-2xl font-bold mx-auto'>Transaction List</h2>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading transactions</p>}
            {transactions && (
                <ul>
                    {transactions.map(({ id, type, category, amount, date }) => (
                        <li key={id} className='text-xl pt-3 flex'>
                            <div className='flex flex-col'>
                                <strong>{category.label}</strong>
                                <span>{date}</span>
                            </div>
                            <span className={
                                `font-bold my-auto ml-auto ${type === 'income' ? "text-green-500 before:content-['_+_']" : "text-red-500 before:content-['_-_']"
                                }`

                            }>{amount}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}



export default TransactionList