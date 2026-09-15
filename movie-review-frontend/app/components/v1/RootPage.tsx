'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
    const { session } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(session) {
            console.log("Session set -> movies");
            router.push("/movies");
        } else {
            console.log("Session not set -> login");
            router.push("/login");
        }
    }, [session, router]);

    return(<></>);
}