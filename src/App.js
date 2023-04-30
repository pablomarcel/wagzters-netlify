import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Create from './pages/Create';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
