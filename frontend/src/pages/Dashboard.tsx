
import TransactionOverview from '@/components/TransactionOverview';
import { useGetAuthUser } from '@/hooks/useGetAuthUser';

const Dashboard = () => {
    const { data: user, isLoading } = useGetAuthUser();

    if (isLoading) {
        return <div>Loading...</div>;
    }



    return (
        <div className='m-auto w-lg'>
            <TransactionOverview />
        </div>
    );
}

export default Dashboard