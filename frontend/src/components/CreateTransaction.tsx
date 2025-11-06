import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { SelectOptionsDropdown } from './SelectCategoryDropdown'

const CATEGORIES = [
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Salary",
    "Rent"
]

const TRANSACTION_TYPES = [
    "Income",
    "Expense",
]


const CreateTransaction = () => {
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const transactionData = {
            type,
            amount: parseFloat(amount),
            date,
            category
        };
        console.log('Transaction Data:', transactionData);
    }


    return (
        <Card className="m-auto w-lg gap-2">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Create Transaction</CardTitle>
                <CardDescription>Enter your transaction details</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>

                <CardContent>
                    <div>
                        <SelectOptionsDropdown options={TRANSACTION_TYPES} label="Transaction Type" placeholder="Is This an Income or Expense?" setCategory={setType} />
                    </div>
                    <div>
                        <Label>Amount</Label>
                        <Input
                            type="number"
                            name="amount"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Date:</Label>
                        <Input
                            type="date"
                            name="date"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <SelectOptionsDropdown options={CATEGORIES} label="Categories" placeholder="Select a category" setCategory={setCategory} />
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