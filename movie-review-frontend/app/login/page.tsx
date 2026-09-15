'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const { session, login } = useAuth();
    const router = useRouter();

    // 1. Local UI States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already logged in
    useEffect(() => {
        if (session) {
            //localStorage.setItem('movie_session', JSON.stringify(session));
            router.push('/movies');
        }
    }, [session, router]);

    // 2. Handle Form Submission
    const handleSubmit = async (e: React.ChangeEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const success = await login(username, password);

        if (!success) {
            setError('Invalid credentials! Try Alex / 123');
            setIsLoading(false);
            return;
        }
        console.log("Login successful, navigating to movie reviews dashboard");
        router.push('/movies');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }}
                        required 
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }}
                        required 
                    />
                </div>

                <button type="submit" disabled={isLoading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    {isLoading ? "Logging in..." : "Log In"}
                </button>
            </form>
        </div>
    );
}