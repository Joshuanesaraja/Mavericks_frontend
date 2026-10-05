import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuth } from "./modules/auth/hooks/useAuth";

function App() {
    const { loadProfile } = useAuth();

    useEffect(() => {
        const tenant = localStorage.getItem(
            "tenant_subdomain"
        );

        if (tenant) {
            loadProfile();
        }
    }, [loadProfile]);

    return <AppRouter />;
}

export default App;