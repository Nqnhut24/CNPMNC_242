import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Employee from "./pages/Employee";
import Manager from "./pages/Manager";
import Finance from "./pages/Manager";
import RequestHistory from "./pages/RequestHistory";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Protected Routes */}
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
                    
                    {/* Other routes */}
                    <Route path="/finance" element={<RequestHistory />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
