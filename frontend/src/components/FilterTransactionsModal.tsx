import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
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

const FilterTransactionsModal = ({ setCategory }) => {
    const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filter Transactions</DialogTitle>
                    <DialogDescription>
                        Use the Options below to filter transactions by category.
                    </DialogDescription>
                </DialogHeader>

                <Label className="mt-4 mb-2 font-semibold">Category</Label>
                <SelectOptionsDropdown isLoading={categoriesLoading} options={categories} label="Categories" placeholder="Select a category" setCategory={setCategory} />

                <Label className="mt-4 mb-2 font-semibold">Select A Date Range</Label>
                <DatePicker mode="range"
                    date={dateRange}
                    setDate={setDateRange} />
            </DialogContent>
        </Dialog>
    )
}

export default FilterTransactionsModal