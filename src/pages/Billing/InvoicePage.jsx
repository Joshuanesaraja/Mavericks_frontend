import { useAuth } from "../../modules/auth/hooks/useAuth";

function InvoicePage() {
    const { logout } = useAuth();

    return (
        <div>
            <h1>Invoices</h1>
            <p>Billing and Payment</p>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default InvoicePage;