import { useGetBudgetStats } from '@/hooks/useGetBudgetStats';
import dayjs from 'dayjs';

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
        <div>
            <h1>BudgetOverview</h1>
            <div>
                {

                    Object.entries(data).map(([key, value]) => {
                        if (key === "over_budget") {
                            return value ? <p>You are Over Budget!</p> : <p>Congrats You Are Under Budget</p>
                        }
                        return <div>
                            <p><span className='font-semibold'>{key} </span>
                                {value}</p>
                        </div>
                    }
                    )
                }
            </div>
        </div >
    )
}

export default BudgetOverview