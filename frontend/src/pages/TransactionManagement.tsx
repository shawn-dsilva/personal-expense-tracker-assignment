import CreateBudgetModal from '@/components/CreateBudgetModal';
import CreateCategoryModal from '@/components/CreateCategoryModal';
import TransactionFormModal from '@/components/TransactionFormModal';
import TransactionList from '@/components/TransactionList';
const TransactionManagement = () => {
    return (
        <div className='m-auto w-lg'>
            <h2 className='text-3xl w-fit pb-3 font-bold mx-auto mb-3'>Transaction Overview</h2>
            <div className='flex flex-row w-fit gap-2 py-3 mx-auto'>
                <TransactionFormModal actionType="Add" />
                <CreateCategoryModal />
            </div>

            <TransactionList />
        </div>
    )
}

export default TransactionManagement