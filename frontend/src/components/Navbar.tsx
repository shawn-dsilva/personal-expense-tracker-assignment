import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { DollarSign, HandCoins } from "lucide-react"


const LINKS = [
    { label: "Dashboard", route: "/dashboard" },
    { label: "Transactions", route: "/transactions" },
    { label: "Budget", route: "/budget" },

]


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="mx-auto shadow-md p-3 m-3 border-t rounded-lg flex flex-row">
            <h1 className="text-center m-2 font-bold border-r-2 pr-3">
                <HandCoins className="inline" /> Expense Tracker</h1>
            {LINKS.map(({ label, route }) => <Button variant={"link"} size={"lg"} onClick={() => navigate(route)} className={location.pathname === route ? "underline" : ""}>
                {label}
            </Button>)}

        </nav>
    )
}

export default Navbar