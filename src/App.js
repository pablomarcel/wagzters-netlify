//wagzters/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Create from './pages/Create';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/create" element={<PrivateRoute />}>
                        <Route index element={<Create />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
