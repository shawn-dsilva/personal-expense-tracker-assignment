"use client"
import { EllipsisIcon, SquarePenIcon, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { useState } from 'react';
import { useDeleteTransaction } from '@/hooks/useDeleteTransaction';

const EditDeleteDropdown = ({ transactionId }: { transactionId: number, }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { mutate: deleteTransaction } = useDeleteTransaction();

    const editTransaction = (transactionId: number) => {
        console.log('Edit transaction with ID:', transactionId);
        // Implement edit functionality here
    };

    const deleteTransactionHandler = (transactionId: number) => {
        console.log('Delete transaction with ID:', transactionId);
        deleteTransaction(transactionId);
    };

    return (
        <div className='pl-3'>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="ml-auto cursor-pointer" >
                    <EllipsisIcon className="text-gray-900" size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()} side="top">
                    <DropdownMenuItem variant='destructive' onSelect={() => setShowDeleteModal(true)}>
                        <Trash2 className="mr-2" />
                        Delete Transaction
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editTransaction(transactionId)}>
                        <SquarePenIcon className="mr-2" />
                        Edit Transaction
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Confirm Delete Transaction Modal */}
            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent className='gap-3!'>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this transaction? This action cannot be undone.
                        </DialogDescription>
                        <div className='flex gap-2 mt-4 justify-end'>
                            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={() => { deleteTransactionHandler(transactionId); setShowDeleteModal(false); }}>
                                <Trash2 />
                                Delete
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )

}

export default EditDeleteDropdown