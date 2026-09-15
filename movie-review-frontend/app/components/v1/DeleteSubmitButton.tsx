'use client';

import { useFormStatus } from 'react-dom';

export default function DeleteSubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}
            style={{
                position: 'absolute',
                right: '15px',
                bottom: '15px',
                padding: '5px 10px',
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'}}>
            {pending ? 'Deleting Review...' : 'Delete'}
        </button>
    );
}