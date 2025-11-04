import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Login = () => {
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

                            <Button type="submit" className="w-full">
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