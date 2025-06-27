import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const result = await fetch(`${PUBLIC_API_BASE_URL}/api/prices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await result.json();
        
        return json(data);
    } catch {
        return json({ error: 'Failed to get prices' }, { status: 500 });
    }
} 