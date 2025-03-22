import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Employee from "./pages/Employee";
import Manager from "./pages/Manager";
import Finance from "./pages/Manager";
import RequestHistory from "./pages/RequestHistory";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/history"
                        element={<Manager />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/request"
                        element={<Employee />}
                    />
                    <Route
                        path="/manager"
                        element={<RequestHistory />}
                    />
                    <Route
                        path="/finance"
                        element={<Finance />}
                    />
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
