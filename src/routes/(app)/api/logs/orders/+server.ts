import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async () => {
    try {
        const result = await fetch(`${PUBLIC_API_BASE_URL}/api/logs/orders`);
        const data = await result.json();
        
        return json(data);
    } catch {
        return json({ error: 'Failed to get order logs' }, { status: 500 });
    }
} 