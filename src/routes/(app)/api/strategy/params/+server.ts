import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async () => {
    try {
        const result = await fetch(`${PUBLIC_API_BASE_URL}/api/strategy/params`);
        const data = await result.json();
        
        return json(data);
    } catch {
        return json({ error: 'Failed to get params' }, { status: 500 });
    }
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const result = await fetch(`${PUBLIC_API_BASE_URL}/api/strategy/params`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await result.json();
        
        return json(data);
    } catch {
        return json({ error: 'Failed to set params' }, { status: 500 });
    }
} 