import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { SelectOptionsDropdown } from './SelectCategoryDropdown'
import { DatePicker } from './DatePicker'
import { useCreateTransaction } from '@/hooks/useCreateTransaction'
import { useGetAllCategories } from '@/hooks/useGetCategoryList'

const CATEGORIES = [
    { value: 1, label: "Food" },
    { value: 2, label: "Transport" },
    { value: 3, label: "Utilities" },
    { value: 4, label: "Entertainment" },
    { value: 5, label: "Healthcare" },
    { value: 6, label: "Education" },
    { value: 7, label: "Shopping" },
    { value: 8, label: "Travel" },
    { value: 9, label: "Miscellaneous" },
]

const TRANSACTION_TYPES = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
]


const CreateTransaction = () => {
    const [type, setType] = useState<"income" | "expense">("")
    const [amount, setAmount] = useState<number>(0)
    const [date, setDate] = useState<string>(null)
    const [category, setCategory] = useState<string>("")

    const { mutate: createTransaction, isPending: isLoading } = useCreateTransaction();
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
        <Card className="m-auto w-lg gap-2">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Create Transaction</CardTitle>
                <CardDescription>Enter your transaction details</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>

                <CardContent className='flex flex-wrap gap-4 p-3'>
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
                </CardContent>
                <CardFooter>
                    <Button type="submit">Create Transaction</Button>
                </CardFooter>
            </form>

        </Card >
    )
}

export default CreateTransaction