import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SelectOptionsDropdown } from './SelectCategoryDropdown'
import { DatePicker } from './DatePicker'
import { useCreateTransaction } from '@/hooks/useCreateTransaction'
import { useGetAllCategories } from '@/hooks/useGetCategoryList'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CirclePlus } from 'lucide-react'

const TRANSACTION_TYPES = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
]


const TransactionFormModal = ({ actionType, transactionData, submit, open, setOpen }) => {

    const [formData, setFormData] = useState({});


    const { mutate: createTransaction } = useCreateTransaction();
    const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();

    useEffect(() => {
        console.log(transactionData)
        if (transactionData) {
            setFormData(transactionData)
        }
    }, [transactionData])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Transaction Data:', formData);

        submit(transactionData);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    !transactionData && <Button size="lg" variant="outline">
                        <CirclePlus />
                        {actionType} Transaction
                    </Button>
                }
            </DialogTrigger>
            <DialogContent className="m-auto w-lg gap-2">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl">{actionType} Transaction</DialogTitle>
                    <DialogDescription>Enter your transaction details</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>

                    <div className='flex flex-wrap gap-4 p-3'>
                        <div className='w-[48%] flex flex-col gap-3'>
                            <Label>Transaction Type</Label>
                            <SelectOptionsDropdown value={formData.type} options={TRANSACTION_TYPES} label="Transaction Type" placeholder="Income or Expense?" setCategory={(type) => setFormData({ type: type })} />
                        </div>
                        <div className='w-[48%] flex flex-col gap-3'>
                            <Label>Amount</Label>
                            <Input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={(e) => setFormData({ amount: e.target.value })}
                            />
                        </div>
                        <div className='w-[48%] flex flex-col gap-3'>
                            <DatePicker date={formData.date ? new Date(formData.date) : undefined} setDate={(date) => setFormData({ date: date })} />
                        </div>
                        <div className='w-[48%] flex flex-col gap-3'>
                            <Label>Category</Label>
                            <SelectOptionsDropdown value={formData.category} isLoading={categoriesLoading} options={categories} label="Categories" placeholder="Select a category" setCategory={(category) => setCategory({ category: category })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit"> Submit </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default TransactionFormModal