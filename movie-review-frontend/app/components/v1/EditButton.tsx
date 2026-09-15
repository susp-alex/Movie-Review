'use client'

import { useRouter } from "next/navigation";

export default function EditButton({ reviewId }: { reviewId: number}) {
    const router = useRouter();
    
    return (
        <button 
            onClick={() => router.push(`/movies/${reviewId}`)}
            style={{ padding: '5px 10px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Edit
        </button>
    );
}