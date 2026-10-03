import { useAuth } from "../../modules/auth/hooks/useAuth";

function CalendarPage() {
    const { logout } = useAuth();

    return (
        <div>
            <h1>Calendar</h1>
            <p>Calendar Management</p>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default CalendarPage;