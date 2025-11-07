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

const FilterTransactionsModal = () => {
    const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();
    const [category, setCategory] = useState<string>("")
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(),
    })
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

                <div>
                    <Label className="mt-4 font-semibold">Amount</Label>
                    <div className='flex gap-3'>
                        <Input type="number" placeholder="Enter Starting Amount" className="mb-2 mt-2" />
                        <Input type="number" placeholder="Enter Ending Amount" className="mb-2 mt-2" />
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
                    <Button type="submit" size={"lg"}>Apply Filters</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default FilterTransactionsModal