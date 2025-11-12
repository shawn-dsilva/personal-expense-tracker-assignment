import { useGetBudgetStats } from '@/hooks/useGetBudgetStats';
import dayjs from 'dayjs';
import { ArrowDown, ArrowUp } from 'lucide-react';
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

const BudgetOverview = () => {

    const { data, isLoading, isError } = useGetBudgetStats(dayjs().month() + 1);


    if (isLoading) {
        return <div>Loading</div>
    }

    if (isError) {
        return <div>Error</div>
    }


    { console.log(data) }
    return (
        <div className='p-3 border-2 rounded-lg flex w-lg flex-col'>
            <h2 className='text-2xl font-bold mx-auto m-3'> Budget Overview</h2>
            <div className='flex flex-row gap-2 w-full'>
                <div className='w-[49%]'>
                    <h3 className='text-xl font-bold'>Monthly Budget</h3>
                    <p className="font-bold text-xl text-blue-500">{data["budget"]}</p>
                </div>
                <div className='w-[49%]'>
                    <h3 className='text-xl font-bold'>Total Expense</h3>
                    <p className='font-bold text-xl text-red-500'>{data["total_expense"]}</p>
                </div>
            </div>


            <BarChart data={[
                { name: STYLE["total_expense"].label, value: data["total_expense"] },
            ]} width={512} height={380} lineValue={data["budget"]} colorRange={["#fb2c36"]} />

            {
                <p className='text-lg py-3 text-center'>
                    {data["over_budget"] ? <span>You are Over Budget </span> : <span>Congrats You Are Under Budget</span>} by  <span className={`font-bold text-xl ${data["over_budget"] ? "text-red-500" : "text-green-500"}`}>{data["budget_difference"]}</span></p>
            }
        </div >
    )
}

export default BudgetOverview