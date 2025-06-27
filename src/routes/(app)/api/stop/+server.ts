import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const POST: RequestHandler = async () => {
    try {
        const result = await fetch(`${PUBLIC_API_BASE_URL}/api/stop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await result.json();
        
        return json(data);
    } catch {
        return json({ error: 'Failed to stop strategy' }, { status: 500 });
    }
} 