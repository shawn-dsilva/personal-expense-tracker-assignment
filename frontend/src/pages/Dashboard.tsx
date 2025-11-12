import BudgetOverview from '@/components/BudgetOverview';
import CreateBudgetModal from '@/components/CreateBudgetModal';
import CreateCategory from '@/components/CreateCategory';
import TransactionFormModal from '@/components/TransactionFormModal';
import TransactionList from '@/components/TransactionList';
import TransactionOverview from '@/components/TransactionOverview';
import { useGetAuthUser } from '@/hooks/useGetAuthUser';

const Dashboard = () => {
    const { data: user, isLoading } = useGetAuthUser();

    if (isLoading) {
        return <div>Loading...</div>;
    }



    return (
        <div>
            <div className='mx-auto w-lg'>
                <TransactionOverview />
                <BudgetOverview />
                <TransactionFormModal actionType="Add" />
                <CreateBudgetModal />
                <TransactionList />
                <CreateCategory />
            </div>

        </div>
    );
}

export default Dashboard