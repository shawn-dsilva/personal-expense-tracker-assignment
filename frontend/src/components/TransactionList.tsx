import { useGetPaginatedTransactionsList } from '@/hooks/useGetPaginatedTransactionList';
import { useGetAllTransactions } from '@/hooks/useGetTransactionsList';
import { capitalizeFirstLetter } from '@/lib/utils';
import dayjs from 'dayjs';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TransactionList = () => {
    // const { data:transactions transactions, isLoading, isError } = useGetAllTransactions();

    const {
        data: transactions,
        isLoading,
        isError,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetPaginatedTransactionsList();

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Error loading transactions</p>
    }

    console.log(transactions)

    return (
        <div className="flex w-lg gap-2 flex-col mx-auto p-4 border-dashed border-2 border-gray-300 rounded-md my-4">
            <h2 className='text-2xl font-bold mx-auto m-3'>Transaction List</h2>
            <ul>

                {transactions && transactions.pages.length > 0 && (
                    transactions.pages[transactions.pageParams.length - 1].results.map(({ id, type, category_read, amount, date }) => (
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
                        <Button variant="outline" onClick={() => fetchPreviousPage()}>
                            <ChevronLeft />
                            Prev
                        </Button>
                    </PaginationItem>
                    {
                        transactions?.pageParams.map((pageParam, index) => (
                            <PaginationItem key={index}>
                                <Button variant="outline">
                                    {index + 1}
                                </Button>
                            </PaginationItem>
                        ))
                    }
                    <PaginationItem>
                        <Button variant="outline" onClick={() => fetchNextPage()}>
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