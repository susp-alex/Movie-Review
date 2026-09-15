'use client';

import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function EditFormButtons() {
    const { pending } = useFormStatus();
    const router = useRouter();

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={pending} 
                style={{ padding: '10px 20px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {pending ? 'Saving changes...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => router.push('/')} style={{ padding: '10px 20px', background: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
        </div>
    );
}