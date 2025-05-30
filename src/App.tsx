import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login.tsx';
import Chatbot from './Chatbot.tsx';
import './App.css';

const LoginWithRedirect: React.FC = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/chat');
    };
    return <Login onLogin={handleLogin} />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginWithRedirect />} />
                <Route path="/chat" element={<Chatbot />} />
            </Routes>
        </Router>
    );
};

export default App; 