import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const admins = [
        { username: 'admin1', password: 'password1' },
        { username: 'admin2', password: 'password2' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError('Username and password are required');
            return;
        }
        
        const isAdmin = admins.some(admin => admin.username === username && admin.password === password);

        if (isAdmin) {
            login();
            navigate('/admin-dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Admin Login</h2>
                            {error && <p className="text-danger">{error}</p>}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
