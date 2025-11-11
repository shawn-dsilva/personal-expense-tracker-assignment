import { useGetPaginatedTransactions } from '@/hooks/useGetPaginatedTransactionsList';
import { capitalizeFirstLetter } from '@/lib/utils';
import dayjs from 'dayjs';


import { useState } from 'react';
import PaginationControls from './PaginationControls';
import FilterTransactionsModal from './FilterTransactionsModal';
import EditDeleteDropdown from './EditDeleteDropdown';

const TransactionItem = ({ data }) => {
    const { id, type, category_read, amount, date } = data;
    return <li key={id} className='text-xl pt-3 flex  border-gray-200 border-dashed border-t-2'>
        <div className='flex flex-col pb-3'>
            <span className='font-semibold'>{capitalizeFirstLetter(category_read?.label)}</span>
            <span>{dayjs(date).format('ddd, DD MMM YYYY')}</span>
        </div>


        <span className={
            `font-bold my-auto ml-auto ${type === 'income' ? "text-green-500 before:content-['_+_']" : "text-red-500 before:content-['_-_']"
            }`
        }>${amount}</span>
        <EditDeleteDropdown transactionData={data} />

    </li>
}


const TransactionList = () => {
    const [currPage, setCurrPage] = useState(1);
    const [filters, setFilters] = useState({});

    const { data: transactions, isLoading, isError } = useGetPaginatedTransactions(currPage, filters);


    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Error loading transactions</p>
    }

    return (
        <div className="flex w-lg gap-2 flex-col mx-auto p-4 border-dashed border-2 border-gray-300 rounded-md my-4">
            <div className='relative flex'>
                <h2 className='text-2xl font-bold mx-auto my-3'>
                    Transaction List
                </h2>
                <FilterTransactionsModal setFilters={setFilters} />
            </div>

            <ul>
                {isLoading ? <div>Loading Transactions</div> :
                    transactions && transactions.results.length > 0 && (
                        transactions.results.map((transaction) => (
                            <TransactionItem data={transaction} />
                        ))
                    )}
            </ul>
            <PaginationControls transactions={transactions} currPage={currPage} setCurrPage={setCurrPage} />
        </div>
    )
}



export default TransactionList