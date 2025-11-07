import { useGetPaginatedTransactions } from '@/hooks/useGetPaginatedTransactionsList';
import { capitalizeFirstLetter } from '@/lib/utils';
import dayjs from 'dayjs';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Transaction } from '@/types';


const ITEM_COUNT_PER_PAGE = 2;

const TransactionList = () => {
    const [currPage, setCurrPage] = useState(1);
    const { data: transactions, isLoading, isError } = useGetPaginatedTransactions(currPage);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Error loading transactions</p>
    }

    return (
        <div className="flex w-lg gap-2 flex-col mx-auto p-4 border-dashed border-2 border-gray-300 rounded-md my-4">
            <h2 className='text-2xl font-bold mx-auto m-3'>Transaction List</h2>
            <ul>

                {transactions && transactions.results.length > 0 && (
                    transactions.results.map(({ id, type, category_read, amount, date }: Transaction) => (
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
                    ))
                )}
            </ul>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <Button variant="outline" onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))} disabled={!transactions.previous}>
                            <ChevronLeft />
                            Prev
                        </Button>
                    </PaginationItem>
                    {
                        Array.from({ length: Math.ceil(transactions.count / ITEM_COUNT_PER_PAGE) }, (_, index) => index).map((_, index) => (
                            <PaginationItem key={index}>
                                <Button variant="outline" className={currPage === index + 1 ? 'bg-blue-500 text-white' : ""} onClick={() => setCurrPage(index + 1)}>
                                    {index + 1}
                                </Button>
                            </PaginationItem>
                        ))
                    }
                    <PaginationItem>
                        <Button variant="outline" onClick={() => transactions.next && setCurrPage((prev) => prev + 1)} disabled={!transactions.next}>
                            Next
                            <ChevronRight />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}



export default TransactionList