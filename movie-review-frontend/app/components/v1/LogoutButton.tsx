'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/login");
    }

    return (
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
    );
    
}