import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SurveyList from './components/SurveyList';
import CreateSurvey from './components/CreateSurvey';
import SurveyDetails from './components/SurveyDetails';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedAttempts = localStorage.getItem('loginAttempts');
        if (storedAttempts) {
            setLoginAttempts(JSON.parse(storedAttempts));
        }
    }, []);

    const handleLogin = (email, password) => {
        setIsLoggedIn(true);
        const newAttempt = { email, password, timestamp: new Date().toLocaleString() };
        const updatedAttempts = [...loginAttempts, newAttempt];
        setLoginAttempts(updatedAttempts);
        localStorage.setItem('loginAttempts', JSON.stringify(updatedAttempts));
        navigate('/');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleAdminLogin = (password) => {
        if (password === 'admin123') {
            setIsAdmin(true);
            navigate('/admin');
        } else {
            alert('Incorrect admin password.');
        }
    };

    const handleAdminLogout = () => {
        setIsAdmin(false);
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Cinema Survey</h1>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/admin"
                    element={
                        isAdmin ? (
                            <AdminPanel
                                loginAttempts={loginAttempts}
                                onLogout={handleAdminLogout}
                            />
                        ) : (
                            <AdminLogin onAdminLogin={handleAdminLogin} />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <SurveyList onLogout={handleLogout} />
                        ) : (
                            <Login onLogin={handleLogin} />
                        )
                    }
                />
                <Route
                    path="/create"
                    element={isLoggedIn ? <CreateSurvey /> : <Login onLogin={handleLogin} />}
                />
                <Route
                    path="/survey/:id"
                    element={isLoggedIn ? <SurveyDetails /> : <Login onLogin={handleLogin} />}
                />
            </Routes>
            {isLoggedIn && !isAdmin && (
                <button onClick={() => navigate('/admin')}>Admin Panel</button>
            )}
        </div>
    );
}

export default App;
