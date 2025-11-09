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
            <h1>Dashboard</h1>
            <p>Welcome, {user.username}!</p>
            <div className='mx-auto w-lg'>
                <TransactionOverview />
                <TransactionFormModal actionType="Add" />
                <TransactionList />
                <CreateCategory />
            </div>

        </div>
    );
}

export default Dashboard