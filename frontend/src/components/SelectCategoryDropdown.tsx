import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectOptionsDropdown({ label, placeholder, setCategory }: { label: string, placeholder: string, setCategory: React.Dispatch<React.SetStateAction<string>> }) {

    const CATEGORIES = [
        "Food",
        "Transportation",
        "Utilities",
        "Entertainment",
        "Salary",
        "Rent"
    ]
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category} onKeyDown={() => setCategory(category)}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default SelectOptionsDropdown