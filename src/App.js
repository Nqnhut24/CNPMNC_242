import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Employee from "./pages/Employee";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path=""
                        element={<Employee />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
