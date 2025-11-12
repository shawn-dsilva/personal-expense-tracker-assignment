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
import { set } from 'date-fns'

const TRANSACTION_TYPES = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
]


const TransactionFormModal = ({ actionType, transactionData, submitTransaction, open, setOpen }) => {

    const [type, setType] = useState<"income" | "expense">("")
    const [amount, setAmount] = useState<number>(0)
    const [date, setDate] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [transactionId, setTransactionId] = useState();

    const { mutate: createTransaction } = useCreateTransaction();
    const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();

    useEffect(() => {
        if (transactionData) {
            setType(transactionData.type);
            setAmount(transactionData.amount);
            setDate({ from: transactionData.date });
            setCategory(transactionData.category)
            setTransactionId(transactionData.id)
        }
    }, [transactionData])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let transactionData = {
            type,
            amount: parseFloat(amount),
            date: date.from,
            category: parseInt(category),
        };

        if (transactionId) {
            transactionData.id = transactionId;
        }


        submitTransaction(transactionData);
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
                            <SelectOptionsDropdown value={type} options={TRANSACTION_TYPES} label="Transaction Type" placeholder="Income or Expense?" setCategory={(type) => setType(type)} />
                        </div>
                        <div className='w-[48%] flex flex-col gap-3'>
                            <Label>Amount</Label>
                            <Input
                                type="number"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className='w-[48%] flex flex-col gap-3'>
                            <DatePicker date={date ? new Date(date.from) : undefined} setDate={(date) => setDate(date)} />
                        </div>
                        <div className='w-[48%] flex flex-col gap-3'>
                            <Label>Category</Label>
                            <SelectOptionsDropdown value={category} isLoading={categoriesLoading} options={categories} label="Categories" placeholder="Select a category" setCategory={(category) => setCategory(category)} />
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