import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../modules/auth/hooks/useAuth";

const SidebarContainer = styled.aside`
    width: ${({ theme }) => theme.layout.sidebarWidth};
    min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});

    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};

    background: ${({ theme }) => theme.colors.sidebar};

    border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const SidebarTitle = styled.h2`
    margin: 0 0 ${({ theme }) => theme.spacing.lg};

    color: ${({ theme }) => theme.colors.sidebarText};

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;

    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

const Navigation = styled.nav`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const NavigationLink = styled(NavLink)`
    display: flex;
    align-items: center;

    min-height: 42px;
    padding: 10px 12px;

    border-radius: ${({ theme }) => theme.radius.md};

    color: ${({ theme }) => theme.colors.sidebarText};
    text-decoration: none;

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 500;

    transition:
        background 0.2s ease,
        color 0.2s ease,
        transform 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.surfaceHover};
        color: ${({ theme }) => theme.colors.text};

        transform: translateX(2px);
    }

    &.active {
        background: ${({ theme }) => theme.colors.sidebarActive};
        color: #ffffff;

        font-weight: 600;
    }
`;

function Sidebar() {
    const { user } = useAuth();

    const roles = user?.roles || [];

    const isAdmin = roles.includes("Admin");
    const canAccessPatients =
        roles.includes("Provider") ||
        roles.includes("Nurse");
    const canAccessAppointments =
        roles.includes("Admin") ||
        roles.includes("Provider") ||
        roles.includes("Nurse") ||
        roles.includes("Patient");
    const canAccessPrescriptions =
        roles.includes("Admin") ||
        roles.includes("Provider") ||
        roles.includes("Nurse") ||
        roles.includes("Patient") ||
        roles.includes("Pharmacist");
    const canAccessCommunication =
        roles.includes("Provider") ||
        roles.includes("Nurse") 
    const canAccessCalendar =
        roles.includes("Admin") ||
        roles.includes("Provider") ||
        roles.includes("Nurse") ||
        roles.includes("Patient") ||
        roles.includes("Pharmacist");
    <NavigationLink to="/notifications">
        Notifications
    </NavigationLink>
    const canAccessBilling =
        roles.includes("Admin") ||
        roles.includes("Provider") ||
        roles.includes("Nurse");
    const canAccessSecurity =
        roles.includes("Admin") ||
        roles.includes("Provider") ||
        roles.includes("Nurse") ||
        roles.includes("Patient") ||
        roles.includes("Pharmacist");

    return (
        <SidebarContainer>
            <SidebarTitle>Navigation</SidebarTitle>

            <Navigation>
                {(isAdmin || roles.includes("Provider")) && (
                    <NavigationLink to="/dashboard">
                        Dashboard
                    </NavigationLink>
                )}

                {canAccessPatients && (
                    <NavigationLink to="/patients">
                        Patients
                    </NavigationLink>
                )}

                {canAccessAppointments && (
                    <NavigationLink to="/appointments">
                        Appointments
                    </NavigationLink>
                )}

                {canAccessPrescriptions && (
                    <NavigationLink to="/prescriptions">
                        Prescriptions
                    </NavigationLink>
                )}

                {canAccessCommunication && (
                    <NavigationLink to="/communication">
                        Communication
                    </NavigationLink>
                )}

                {canAccessCalendar && (
                    <NavigationLink to="/calendar">
                        Calendar
                    </NavigationLink>
                )}

                {canAccessBilling && (
                    <NavigationLink to="/billing">
                        Billing
                    </NavigationLink>
                )}

                {isAdmin && (
                    <NavigationLink to="/staff">
                        Staff
                    </NavigationLink>
                )}

                {isAdmin && (
                    <NavigationLink to="/users">
                        Users
                    </NavigationLink>
                )}

                {canAccessSecurity && (
                    <NavigationLink to="/settings/security">
                        Security
                    </NavigationLink>
                )}
            </Navigation>
        </SidebarContainer>
    );
}

export default Sidebar;