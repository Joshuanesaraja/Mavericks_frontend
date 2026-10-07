import { lazy, Suspense, useEffect } from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";

import RegisterPage from "../pages/Auth/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PatientList from "../pages/Patients/PatientList";
import AppointmentList from "../pages/Appointments/AppointmentList";
import PrescriptionList from "../pages/Prescriptions/PrescriptionList";
import CommunicationPage from "../pages/Communication/CommunicationPage";
import CalendarPage from "../pages/Calendar/CalendarPage";
import StaffManagement from "../pages/Staff/StaffManagement";
import PatientProfile from "../pages/Patients/PatientProfile";
import PrescriptionDetails from "../pages/Prescriptions/PrescriptionDetails";
import UserManagement from "../pages/Settings/UserManagement";
import SecuritySettings from "../pages/Settings/SecuritySettings";
import NotificationsPage from "../pages/Notifications/NotificationsPage";

import DashboardLayout from "../components/layout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

import InvoicePage from "../pages/Billing/InvoicePage";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { getTenantSubdomain } from "../services/tenantService";

const LoginPage = lazy(() =>
    import("../pages/Auth/LoginPage")
);

function AuthInitializer() {
    const { loadProfile, initializeCsrf } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const tenant = getTenantSubdomain();

        if (tenant) {
            initializeCsrf();
        }
    }, [initializeCsrf]);

    useEffect(() => {
        const tenant = getTenantSubdomain();

        const isPublicAuthPage =
            location.pathname === "/login" ||
            location.pathname === "/register";

        if (tenant && !isPublicAuthPage) {
            loadProfile();
        }
    }, [loadProfile, location.pathname]);

    return null;
}

function AppRouter() {
    return (
        <BrowserRouter>
            <AuthInitializer />

            <Routes>
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<div>Loading login...</div>}>
                            <LoginPage />
                        </Suspense>
                    }
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Admin",
                                    "Provider"
                                ]}
                            >
                                <DashboardLayout>
                                    <DashboardPage />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patients"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Provider",
                                    "Nurse"
                                ]}
                            >
                                <DashboardLayout>
                                    <PatientList />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patients/:id"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Provider",
                                    "Nurse"
                                ]}
                            >
                                <DashboardLayout>
                                    <PatientProfile />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Admin",
                                    "Provider",
                                    "Nurse",
                                    "Patient"
                                ]}
                            >
                                <DashboardLayout>
                                    <AppointmentList />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/prescriptions"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Provider",
                                    "Pharmacist"
                                ]}
                            >
                                <DashboardLayout>
                                    <PrescriptionList />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/prescriptions/detail/:id"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Provider",
                                    "Pharmacist"
                                ]}
                            >
                                <DashboardLayout>
                                    <PrescriptionDetails />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/communication"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Provider",
                                    "Nurse"
                                ]}
                            >
                                <DashboardLayout>
                                    <CommunicationPage />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Provider",
                                    "Nurse"
                                ]}
                            >
                                <DashboardLayout>
                                    <NotificationsPage />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/calendar"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Admin",
                                    "Provider",
                                    "Nurse",
                                    "Patient",
                                    "Pharmacist"
                                ]}
                            >
                                <DashboardLayout>
                                    <CalendarPage />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/billing"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Admin",
                                    "Provider",
                                    "Nurse"
                                ]}
                            >
                                <DashboardLayout>
                                    <InvoicePage />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/staff"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={["Admin"]}
                            >
                                <DashboardLayout>
                                    <StaffManagement />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={["Admin"]}
                            >
                                <DashboardLayout>
                                    <UserManagement />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings/security"
                    element={
                        <ProtectedRoute>
                            <RoleBasedRoute
                                allowedRoles={[
                                    "Admin",
                                    "Provider",
                                    "Nurse",
                                    "Patient",
                                    "Pharmacist"
                                ]}
                            >
                                <DashboardLayout>
                                    <SecuritySettings />
                                </DashboardLayout>
                            </RoleBasedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;