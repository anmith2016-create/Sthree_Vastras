const http = require('node:http');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';
const users = new Map();
const sessions = new Map();
const loginAttempts = new Map();
const signupAttempts = new Map();

function hashPassword(password, salt) { return crypto.scryptSync(password, salt, 64); }
function safeEqual(a, b) { return a.length === b.length && crypto.timingSafeEqual(a, b); }
function cookie(req, key) { const part = (req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith(`${key}=`)); return part ? decodeURIComponent(part.slice(key.length + 1)) : ''; }
function send(res, status, body, type = 'application/json; charset=utf-8', headers = {}) { res.writeHead(status, { 'content-type': type, 'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer', 'cache-control': 'no-store', 'content-security-policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'", ...headers }); res.end(type.includes('application/json') ? JSON.stringify(body) : body); }
function json(req, res) { return new Promise(resolve => { let data = ''; req.on('data', chunk => { data += chunk; if (data.length > 12000) req.destroy(); }); req.on('end', () => { try { resolve(JSON.parse(data || '{}')); } catch { send(res, 400, { error: 'Please try again.' }); resolve(null); } }); }); }
function sessionUser(req) { const s = sessions.get(cookie(req, 'sv_session')); return s ? users.get(s.email) : null; }
function requireUser(req, res) { const u = sessionUser(req); if (!u) send(res, 401, { error: 'Please sign in again.' }); else if (u.banned) send(res, 403, { error: 'This account is unavailable.' }); else return u; return null; }
function publicUser(u) { return { email: u.email, name: u.name, role: u.role, banned: u.banned }; }
function newSession(res, user) { const id = crypto.randomBytes(32).toString('base64url'); sessions.set(id, { email: user.email, createdAt: Date.now() }); res.setHeader('set-cookie', `sv_session=${encodeURIComponent(id)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${isProduction ? '; Secure' : ''}`); }
const page = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8').replace('__MODE__', isProduction ? 'production' : 'unconfigured');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/') return send(res, 200, page, 'text/html; charset=utf-8');
  if (req.method === 'GET' && url.pathname === '/health') return send(res, 200, { ok: true, mode: isProduction ? 'production' : 'unconfigured' });
  if (!url.pathname.startsWith('/api/')) return send(res, 404, { error: 'Not found.' });
  if (['/api/deliveries','/api/otp/start','/api/otp/verify','/api/payout/last4','/api/integrations/shop/purchases'].includes(url.pathname)) return send(res, 503, { error: 'This feature is disabled until the verified shopping-app integration is configured.' });
  if (['POST'].includes(req.method)) { const origin = req.headers.origin; if (origin && new URL(origin).host !== req.headers.host) return send(res, 403, { error: 'Request could not be verified.' }); }
  if (req.method === 'GET' && url.pathname === '/api/me') { const u = requireUser(req, res); if (u) return send(res, 200, { user: publicUser(u) }); return; }
  if (req.method === 'POST' && url.pathname === '/api/employee-signup') { const ip = req.socket.remoteAddress || 'unknown', now = Date.now(), attempt = signupAttempts.get(ip) || { count: 0, until: 0 }; if (attempt.until > now) return send(res, 429, { error: 'Too many account creation attempts. Wait a minute and try again.' }); const b = await json(req, res); if (!b) return; const email = String(b.email || '').trim().toLowerCase(), password = String(b.password || ''), name = String(b.name || '').trim().slice(0, 60); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 12 || password.length > 256 || !name) return send(res, 400, { error: 'Enter a name, valid email, and password of at least 12 characters.' }); if (users.has(email)) return send(res, 409, { error: 'An account already uses that email.' }); attempt.count++; if (attempt.count >= 5) { attempt.count = 0; attempt.until = now + 60000; } signupAttempts.set(ip, attempt); const salt = crypto.randomBytes(16), u = { email, name, role: 'employee', salt: salt.toString('hex'), hash: hashPassword(password, salt).toString('hex'), banned: false }; users.set(email, u); newSession(res, u); return send(res, 201, { user: publicUser(u) }); }
  if (req.method === 'POST' && url.pathname === '/api/login') { const b = await json(req, res); if (!b) return; const email = String(b.email || '').trim().toLowerCase(), password = String(b.password || ''), now = Date.now(); const attempt = loginAttempts.get(email) || { count: 0, until: 0 }; if (attempt.until > now) return send(res, 429, { error: 'Too many attempts. Wait a minute and try again.' }); const u = users.get(email); const valid = u && safeEqual(hashPassword(password, Buffer.from(u.salt, 'hex')), Buffer.from(u.hash, 'hex')); if (!valid || u.banned) { attempt.count++; if (attempt.count >= 5) { attempt.count = 0; attempt.until = now + 60000; } loginAttempts.set(email, attempt); return send(res, 401, { error: 'Email or password is incorrect.' }); } loginAttempts.delete(email); newSession(res, u); return send(res, 200, { user: publicUser(u) }); }
  if (req.method === 'POST' && url.pathname === '/api/logout') { sessions.delete(cookie(req, 'sv_session')); res.setHeader('set-cookie', `sv_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${isProduction ? '; Secure' : ''}`); return send(res, 200, { ok: true }); }
  return send(res, 404, { error: 'Not found.' });
});
server.listen(PORT, isProduction ? '0.0.0.0' : '127.0.0.1', () => { console.log(`Sthree Vastras ${isProduction ? 'production' : 'unconfigured'} employee server listening on port ${PORT}`); });

