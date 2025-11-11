import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import SelectOptionsDropdown from "./SelectCategoryDropdown";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BadgeDollarSign } from "lucide-react";
import { useCreateBudget } from "@/hooks/useCreateBudget";

const MONTHS = [
    {
        "value": 1,
        "label": "January"
    },
    {
        "value": 2,
        "label": "February"
    },
    {
        "value": 3,
        "label": "March"
    },
    {
        "value": 4,
        "label": "April"
    },
    {
        "value": 5,
        "label": "May"
    },
    {
        "value": 6,
        "label": "June"
    },
    {
        "value": 7,
        "label": "July"
    },
    {
        "value": 8,
        "label": "August"
    },
    {
        "value": 9,
        "label": "September"
    },
    {
        "value": 10,
        "label": "October"
    },
    {
        "value": 11,
        "label": "November"
    },
    {
        "value": 12,
        "label": "December"
    }
]

const CreateBudgetModal = () => {

    const [amount, setAmount] = useState("");
    const [month, setMonth] = useState("");

    const { mutate: createBudget } = useCreateBudget()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createBudget({ amount, month });
        setAmount("");
        setMonth(undefined);
    }
    { console.log(month) }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} size={"lg"} className="m-3">
                    <BadgeDollarSign />
                    Set Monthly Budget
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Budget</DialogTitle>
                    <DialogDescription>
                        Create a Monthly Budget here
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} >
                    <div className="flex gap-4 mb-4">
                        <div className="w-[48%]">
                            <Label className="semibold pb-2" htmlFor="amount">Budget Amount</Label>
                            <Input id="amount" type="text" placeholder="Set the Budgeted Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <div className="w-[48%]">
                            <Label className="semibold pb-2" >Budget Month</Label>
                            <SelectOptionsDropdown value={month.label} options={MONTHS} placeholder="Select a Month" setCategory={setMonth} />
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit" variant="outline">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBudgetModal