import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransactionManagement from "./pages/TransactionManagement";
import BudgetManagement from "./pages/BudgetManagement";

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col w-full h-svh">
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/login" element={<Login />} />
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/transaction/overview" element={<TransactionManagement />} />
                        <Route path="/budget/overview" element={<BudgetManagement />} />
                    </Route>
                </Routes>
            </div>

        </QueryClientProvider>

    );
}

export default App;
