import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentReport from "./pages/StudentReport";
import DocumentationDetail from "./pages/DocumentationDetail";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["mosque_admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]}>
        <TeacherDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/report/:slug",
    element: <StudentReport />,
  },
  {
    path: "/documentation/:slug",
    element: <DocumentationDetail />,
  },
  {
    path: "/super-admin",
    element: (
      <ProtectedRoute allowedRoles={["super_admin"]}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Super Admin Dashboard</h1>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
