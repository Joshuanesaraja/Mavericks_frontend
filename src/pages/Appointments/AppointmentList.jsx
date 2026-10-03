import { useAuth } from "../../modules/auth/hooks/useAuth";

function AppointmentList() {
    const { logout } = useAuth();

    return (
        <div>
            <h1>Appointments</h1>
            <p>Appointment Management</p>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default AppointmentList;