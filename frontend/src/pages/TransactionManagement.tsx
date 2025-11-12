import CreateBudgetModal from '@/components/CreateBudgetModal';
import CreateCategoryModal from '@/components/CreateCategoryModal';
import TransactionFormModal from '@/components/TransactionFormModal';
import TransactionList from '@/components/TransactionList';
const TransactionManagement = () => {
    return (
        <div className='m-auto w-lg'>
            <h2 className='text-2xl font-bold mx-auto m-3'>Transaction Overview</h2>
            <div className='flex flex-row gap-1 py-3'>
                <TransactionFormModal actionType="Add" />
                <CreateCategoryModal />
            </div>

            <TransactionList />
        </div>
    )
}

export default TransactionManagement