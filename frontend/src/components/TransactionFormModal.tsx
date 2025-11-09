import React, { useState } from 'react'
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


const TransactionFormModal = ({ actionType, initialType = "", initialAmount = 0, initialDate = "", initialCategory = "", onSubmit }) => {

    const [type, setType] = useState<"income" | "expense">(initialType)
    const [amount, setAmount] = useState<number>(initialAmount)
    const [date, setDate] = useState<string>(initialDate)
    const [category, setCategory] = useState<string>(initialCategory)

    const { mutate: createTransaction } = useCreateTransaction();
    const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const transactionData = {
            type,
            amount: parseFloat(amount),
            date: date.from,
            category: parseInt(category),
        };
        console.log('Transaction Data:', transactionData);

        createTransaction(transactionData);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" variant="outline">
                    <CirclePlus />
                    {actionType} Transaction
                </Button>
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
                            <SelectOptionsDropdown options={TRANSACTION_TYPES} label="Transaction Type" placeholder="Income or Expense?" setCategory={setType} />
                        </div>
                        <div className='w-[48%] flex flex-col gap-3'>
                            <Label>Amount</Label>
                            <Input
                                type="number"
                                name="amount"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className='w-[48%] flex flex-col gap-3'>
                            <DatePicker date={date ? new Date(date.from) : undefined} setDate={(date) => setDate(date)} />
                        </div>
                        <div className='w-[48%] flex flex-col gap-3'>
                            <Label>Category</Label>
                            <SelectOptionsDropdown isLoading={categoriesLoading} options={categories} label="Categories" placeholder="Select a category" setCategory={setCategory} />
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