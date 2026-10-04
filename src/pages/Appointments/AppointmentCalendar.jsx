import { useAuth } from "../../modules/auth/hooks/useAuth";

function AppointmentCalendar() {
    const { logout } = useAuth();

    return (
        <div>
            <h1>Appointment Calendar</h1>
            <p>Appointment Calendar</p>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default AppointmentCalendar;