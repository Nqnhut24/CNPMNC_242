import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Employee from "./pages/Employee";
import Login from "./pages/Login";
import Manager from "./pages/Manager";
import Register from "./pages/Register";
import Finance from "./pages/Finance";
import RequestHistory from "./pages/RequestHistory";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    {/* Employee Routes */}
                    <Route
                        path="/request"
                        element={
                            <ProtectedRoute allowedRole="EMPLOYEE">
                                <Employee />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute allowedRole="EMPLOYEE">
                                <Manager />
                            </ProtectedRoute>
                        }
                    />

                    {/* Finance Manager Routes */}
                    <Route
                        path="/finance"
                        element={
                            <ProtectedRoute allowedRole="FINANCE_MANAGER">
                                <RequestHistory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/manager"
                        element={
                            <ProtectedRoute allowedRole="MANAGER">
                                <Finance />
                            </ProtectedRoute>
                        }
                    />

                    {/* Redirect all unknown routes to login */}
                    <Route
                        path="*"
                        element={<Navigate to="/login" />}
                    />  
                </Routes>
            </Router>
        </div>
    );
}

export default App;
