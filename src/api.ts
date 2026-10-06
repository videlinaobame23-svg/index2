/**
 * M4 · MEMBER 2 · Talk to the group's Python API  (also App.tsx and src/config.ts)
 *
 * Owner (your GitHub username): @videlinaobame23-svg
 * Your AI task in the swe3513-cat1 repository: A2 (stats.py)
 *
* Done means: npm run test:api -> 6 pass; App.tsx has no pending TODO; docs/screenshot.png pushed.
 */
import type { NewDelivery } from './logic';

/** GET {baseUrl}/risk?temp_c=<tempC>&hours=<hours>
 *  If res.ok: read the JSON and return { risk: body.risk, label: body.label }.
 *  If the answer is not ok, the network fails or the time runs out: return null. */
export async function getRisk(
  baseUrl: string, tempC: number, hours: number, timeoutMs = 5000,
): Promise<{ risk: number; label: string } | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const url = `${baseUrl}/risk?temp_c=${tempC}&hours=${hours}`;
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) return null;
    const body = await res.json();
    return { risk: body.risk, label: body.label };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** POST {baseUrl}/deliveries with JSON in the Python names (snake_case):
 *    { farmer_id: d.farmerId, litres: d.litres, temp_c: d.tempC, hours: d.hours }
 *  headers: { 'Content-Type': 'application/json' }.  Return res.ok (true/false); false on any error. */
export async function sendDelivery(baseUrl: string, d: NewDelivery, timeoutMs = 5000): Promise<boolean> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${baseUrl}/deliveries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        farmer_id: d.farmerId,
        litres: d.litres,
        temp_c: d.tempC,
        hours: d.hours,
      }),
      signal: ctrl.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}