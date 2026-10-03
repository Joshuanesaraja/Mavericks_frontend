import { useAuth } from "../../modules/auth/hooks/useAuth";

function StaffManagement() {
    const { logout } = useAuth();

    return (
        <div>
            <h1>Staff Management</h1>
            <p>Staff Management</p>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default StaffManagement;