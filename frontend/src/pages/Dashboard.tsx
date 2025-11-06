import CreateTransaction from '@/components/CreateTransaction';
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
            <CreateTransaction />
        </div>
    );
}

export default Dashboard