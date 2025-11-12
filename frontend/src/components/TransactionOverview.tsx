import { ArrowDown, ArrowUp, Key, MinusIcon, PlusIcon } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { useGetTransactionSummary } from '@/hooks/useGetTransactionSummary'
import { BarChart } from './BarChart'

const STYLE = {
    total_income: {
        icon: <ArrowUp />, color: "text-green-500", label: "Total Income"
    },
    total_expense: {
        icon: <ArrowDown />, color: "text-red-500", label: "Total Expense"
    },
    balance: {
        icon: null, color: "text-gray-500", label: "Balance"
    }
}

const TransactionOverview = () => {

    const { data: summary, isLoading, isError } = useGetTransactionSummary();

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Error loading transaction summary</p>
    }

    return (
        <div className='flex w-lg mx-auto flex-col pb-4'>
            <h2 className='text-2xl font-bold mx-auto m-3'>Transaction Overview</h2>
            <div className='flex gap-3'>
                {Object.entries(summary).map(([key, value]) => (
                    <Card key={key} className='w-1/3 py-4 items-center'>
                        <CardContent>
                            <h3 className='font-bold'>{STYLE[key].label}</h3>
                            <p className={`${STYLE[key].color} font-bold flex text-xl mt-2 items-center`}>
                                {STYLE[key].icon} <span>{value}</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <BarChart data={[
                { name: STYLE["total_income"].label, value: summary["total_income"] },
                { name: STYLE["total_expense"].label, value: summary["total_expense"] },
                { name: STYLE["balance"].label, value: summary["balance"] },
            ]} width={512} height={380} colorRange={["#00c951", "#fb2c36", "#6a7282"]} />
        </div>
    )
}


export default TransactionOverview