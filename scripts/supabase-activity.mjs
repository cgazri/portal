import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../main.html', import.meta.url), 'utf8');
const url = html.match(/const SUPABASE_URL = "(https:\/\/[a-z0-9]+\.supabase\.co)";/)?.[1];
const key = html.match(/const SUPABASE_KEY = "(sb_publishable_[A-Za-z0-9_-]+)";/)?.[1];

if (!url || !key) {
    throw new Error('Public Supabase configuration was not found or is invalid.');
}

const endpoint = new URL('/rest/v1/rpc/portal_activity_ping', url);
const response = await fetch(endpoint, {
    method: 'POST',
    headers: { apikey: key, 'Content-Type': 'application/json' },
    body: '{}',
    signal: AbortSignal.timeout(20000)
});
if (!response.ok) {
    throw new Error(`Supabase database request failed (HTTP ${response.status}).`);
}
const result = await response.json();
if (result !== true) {
    throw new Error('Supabase returned an unexpected database response.');
}
console.log('Supabase database request succeeded.');
