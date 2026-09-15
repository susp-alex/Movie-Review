'use client';

import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import LogoutButton from "./LogoutButton";

export default function AuthenticatedHeader() {
    const router = useRouter();
    const { session } = useAuth();

    useEffect(() => {
        if(!session) {
            router.push("/login");
        }
    }, [session, router]);

    if(!session) {
        return <>Session is not set</>
    }
    
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1>Welcome, {session.userName} 👋</h1>
            <LogoutButton />
        </header>
    );
}