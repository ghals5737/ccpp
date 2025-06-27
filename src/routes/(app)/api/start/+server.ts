import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async ({ request }) => {
    try {        
        const url = new URL(request.url)
        const page = url.searchParams.get("page")
        const size = url.searchParams.get("size")
        const result = await fetch(`${PUBLIC_API_BASE_URL}/api/boards/admin?page=${page}&size=${size}`);
        const data = await result.json();
        console.log("data",data)
        
        return json(data);
    } catch {
        return json({ error: 'Failed to fetch admin data' }, { status: 500 });
    }
}
