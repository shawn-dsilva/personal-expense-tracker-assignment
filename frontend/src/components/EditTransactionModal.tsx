import TransactionFormModal from './TransactionFormModal'
import { useUpdateTransaction } from '@/hooks/useEditTransaction';

const EditTransactionModal = () => {

    const { mutate: updateTransaction } = useUpdateTransaction();

    return (
        <TransactionFormModal actionType="Edit" onSubmit={updateTransaction} />
    )
}

export default EditTransactionModal