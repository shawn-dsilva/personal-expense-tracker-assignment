import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SlidersHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { SelectOptionsDropdown } from './SelectCategoryDropdown'
import { useGetAllCategories } from '@/hooks/useGetCategoryList';
import { Label } from '@radix-ui/react-label'
import { DatePicker } from './DatePicker'
import { type DateRange } from "react-day-picker"
import { Input } from './ui/input'

const FilterTransactionsModal = ({ setFilters }) => {
    const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();

    const [category, setCategory] = useState<string>("")
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(),
    })
    const [amounts, setAmounts] = useState<{ min: number; max: number }>({ min: 0, max: 0 })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="my-2 w-fit absolute top-0 right-0">
                    <SlidersHorizontal />
                    Filter
                </Button>
            </DialogTrigger>
            <DialogContent className='gap-3!'>
                <DialogHeader>
                    <DialogTitle>Filter Transactions</DialogTitle>
                    <DialogDescription>
                        Use the Options below to filter transactions by category, date and amount.
                    </DialogDescription>
                </DialogHeader>

                <div className='flex gap-3 w-full'>
                    <div className='w-[48%]'>
                        <Label className='font-semibold'>Min Amount</Label>
                        <Input type="number" placeholder="Enter Min Amount" className="mb-2 mt-2" value={amounts.min} onChange={(e) => setAmounts((prev) => ({ ...prev, min: Number(e.target.value) }))} />
                    </div>
                    <div className='w-[48%]'>
                        <Label className='font-semibold'>Max Amount</Label>
                        <Input type="number" placeholder="Enter Max Amount" className="mb-2 mt-2" value={amounts.max} onChange={(e) => setAmounts((prev) => ({ ...prev, max: Number(e.target.value) }))} />
                    </div>

                </div>


                <div className='flex gap-3'>
                    <div className="flex gap-1 flex-col w-full">
                        <Label className="font-semibold">Category</Label>
                        <SelectOptionsDropdown isLoading={categoriesLoading} options={categories} label="Categories" placeholder="Select a category" setCategory={setCategory} />
                    </div>

                    <div>
                        <DatePicker
                            className="min-w-10/12"
                            label="Select A Date Range"
                            mode="range"
                            date={dateRange}
                            setDate={setDateRange} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" size={"lg"} onClick={() => setFilters({ category, dateRange, amounts })}>Apply Filters</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default FilterTransactionsModal