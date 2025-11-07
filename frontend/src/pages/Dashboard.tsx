import CreateCategory from '@/components/CreateCategory';
import CreateTransaction from '@/components/CreateTransaction';
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
            <TransactionOverview />
            <TransactionList />
            <CreateCategory />
            <CreateTransaction />
        </div>
    );
}

export default Dashboard