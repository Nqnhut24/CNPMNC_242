import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Employee from "./pages/Employee";
import Manager from "./pages/Manager";
import Finance from "./pages/Finance"; // Make sure this import is correct
import RequestHistory from "./pages/RequestHistory";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Employee Routes */}
                    <Route path="/request" element={
                        <ProtectedRoute allowedRole="EMPLOYEE">
                            <Employee />
                        </ProtectedRoute>
                    } />
                    <Route path="/history" element={
                        <ProtectedRoute allowedRole="EMPLOYEE">
                            <Manager />
                        </ProtectedRoute>
                    } />
                    
                    {/* Finance Manager Routes */}
                    <Route path="/finance" element={
                        <ProtectedRoute allowedRole="FINANCE_MANAGER">
                            <RequestHistory />
                        </ProtectedRoute>
                    } />
                    
                    {/* Redirect all unknown routes to login */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
