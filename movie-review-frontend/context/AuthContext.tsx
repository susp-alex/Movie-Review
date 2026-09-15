'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Session, AuthContextType } from '@/types/index'

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session>(null);
    
    // check if user logged in during first mount
    useEffect(() => {
        if(typeof window !== 'undefined') {
            const session = localStorage.getItem('movie_session');
            if(session){
                setSession(JSON.parse(session));
            }
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (username === "Alex" && password === "123") {
                    const authenticatedUser = { id: 1, userName: "Alex" }; 
                    setSession(authenticatedUser);
                    localStorage.setItem('movie_session', JSON.stringify(authenticatedUser));
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    };

    const logout = () => {
        setSession(null);
        localStorage.removeItem('movie_session');
    }
    
    return (
        <AuthContext value={{ session, login, logout }}>
            {children}
        </AuthContext>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error("useAuth must be provided within an AuthProvider");
    }
    
    return context;
}