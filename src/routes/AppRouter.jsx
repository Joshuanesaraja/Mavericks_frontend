import { lazy, Suspense } from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
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

import DashboardLayout from "../components/layout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

const LoginPage = lazy(() =>
    import("../pages/Auth/LoginPage")
);


function AppRouter() {
    return (
        <BrowserRouter>
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
                                    "Admin",
                                    "Provider",
                                    "Nurse",
                                    "Patient",
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
                                    "Admin",
                                    "Provider",
                                    "Nurse",
                                    "Patient",
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
                                    "Admin",
                                    "Provider",
                                    "Nurse",
                                    "Patient",
                                    "Pharmacist"
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