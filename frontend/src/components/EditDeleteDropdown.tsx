"use client"
import { EllipsisIcon, SquarePenIcon, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

const EditDeleteDropdown = ({ transactionId }: { transactionId: number, }) => {

    const editTransaction = (transactionId: number) => {
        console.log('Edit transaction with ID:', transactionId);
        // Implement edit functionality here
    };

    const deleteTransaction = (transactionId: number) => {
        console.log('Delete transaction with ID:', transactionId);
        // Implement delete functionality here
    };

    return (
        <div className='pl-3'>
            <DropdownMenu>
                <DropdownMenuTrigger className="ml-auto cursor-pointer" >
                    <EllipsisIcon className="text-gray-900" size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()} side="top">
                    <DropdownMenuItem variant='destructive' onClick={() => deleteTransaction(transactionId)}>
                        <Trash2 className="mr-2" />
                        Delete Transaction
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editTransaction(transactionId)}>
                        <SquarePenIcon className="mr-2" />
                        Edit Transaction
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )

}

export default EditDeleteDropdown