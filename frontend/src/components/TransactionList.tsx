import { useGetAllTransactions } from '@/hooks/useGetTransactionsList';
import { capitalizeFirstLetter } from '@/lib/utils';
import dayjs from 'dayjs';

const TransactionList = () => {
    const { data: transactions, isLoading, isError } = useGetAllTransactions();
    return (
        <div className="flex w-lg gap-2 flex-col mx-auto p-4 border-dashed border-2 border-gray-300 rounded-md my-4">
            <h2 className='text-2xl font-bold mx-auto m-3'>Transaction List</h2>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading transactions</p>}
            {transactions && transactions.results.length > 0 && (
                <ul>
                    {transactions.results.map(({ id, type, category_read, amount, date }) => (
                        <li key={id} className='text-xl pt-3 flex  border-gray-200 border-dashed border-t-2'>
                            <div className='flex flex-col pb-3'>
                                <span className='font-semibold'>{capitalizeFirstLetter(category_read?.label)}</span>
                                <span>{dayjs(date).format('ddd, DD MMM YYYY')}</span>
                            </div>
                            <span className={
                                `font-bold my-auto ml-auto ${type === 'income' ? "text-green-500 before:content-['_+_']" : "text-red-500 before:content-['_-_']"
                                }`

                            }>${amount}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}



export default TransactionList