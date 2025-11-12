import BudgetOverview from '@/components/BudgetOverview';
import CreateBudgetModal from '@/components/CreateBudgetModal';

const BudgetManagement = () => {
    return (
        <div className='m-auto w-lg flex flex-col gap-2'>
            <BudgetOverview />
            <CreateBudgetModal />
        </div>
    )
}

export default BudgetManagement