import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Employee from "./pages/Employee";
import Manager from "./pages/Manager";
import Finance from "./pages/Manager";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/request"
                        element={<Employee />}
                    />
                    <Route
                        path="/manager"
                        element={<Manager />}
                    />
                    <Route
                        path="/finance"
                        element={<Finance />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
