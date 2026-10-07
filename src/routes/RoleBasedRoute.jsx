import { Navigate } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

export function getRoleLandingPath(roles = []) {
    if (roles.includes("Admin") || roles.includes("Provider")) {
        return "/dashboard";
    }

    if (roles.includes("Nurse")) {
        return "/patients";
    }

    if (roles.includes("Patient")) {
        return "/appointments";
    }

    if (roles.includes("Pharmacist")) {
        return "/prescriptions";
    }

    return "/login";
}

function RoleBasedRoute({ allowedRoles, children }) {
    const { user, isAuthenticated, initialized } = useAuth();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const userRoles = user?.roles || [];

    const hasAllowedRole = userRoles.some((role) =>
        allowedRoles.includes(role)
    );

    if (!hasAllowedRole) {
        return (
            <Navigate
                to={getRoleLandingPath(userRoles)}
                replace
            />
        );
    }

    return children;
}

export default RoleBasedRoute;