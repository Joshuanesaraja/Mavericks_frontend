import { useAuth } from "../../modules/auth/hooks/useAuth";

function CommunicationPage() {
    const { logout } = useAuth();

    return (
        <div>
            <h1>Communication</h1>
            <p>Communication Management</p>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default CommunicationPage;