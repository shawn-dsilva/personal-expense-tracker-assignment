import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/useLogin';

const Login = () => {

    const { mutate: login, isPending: isLoading } = useLogin();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        login(formJson)
    }


    return (
        <Card className="m-auto w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Login</CardTitle>
                <CardDescription>Enter your Credentials</CardDescription>
            </CardHeader>
            <CardContent>
                <form method="post" onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input name="email" id="email" type="email" placeholder="Enter your email" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input name="password" id="password" type="password" placeholder="Enter your password" required />
                            </div>
                            <Button variant={"default"} type="submit" className="">
                                {isLoading ? "loading..." : "Login"}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default Login