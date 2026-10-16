# Sthree Vastras · Admin & Delivery Prototype

A local-only prototype for account login, delivery confirmation, admin account controls, and a clearly marked 90/10 payout illustration.

## Run locally

Requires Node.js 20 or newer. The app uses only built-in Node modules.

Set `DEMO_ADMIN_EMAIL` and `DEMO_ADMIN_PASSWORD` in your local shell before starting the server. The admin password is hashed with Node's scrypt when the server starts; it is not stored in this repository. Do not reuse a real password. Use the credentials from the original request only for local demo/testing, and replace the password before any deployment if it is real.

PowerShell example:

```powershell
$env:DEMO_ADMIN_EMAIL = 'your-demo-admin@example.test'
$env:DEMO_ADMIN_PASSWORD = 'use-a-new-local-demo-password'
node server.js
```

Open `http://127.0.0.1:3000`. New sign-ups receive the employee role. The administrator can inspect and suspend employee accounts. “Switch account” returns to the sign-in screen.

## Prototype boundaries

- No real OTP is sent. A randomly generated six-digit code is displayed only in local demo mode and expires after five minutes.
- The 90% administrator / 10% employee allocation is a display-only demo rule. There are no payment-provider calls or money transfers.
- No bank account number, routing code, or bank credential is collected. The payout screen can hold only four display digits in server memory.
- User accounts, OTP challenges, sessions, and admin display settings are held in memory and disappear when the server stops. This is not production-ready shared storage or authentication.
- Passwords for newly registered accounts use scrypt hashes. Session cookies are HttpOnly and SameSite=Strict. HTTPS is needed before any remote deployment.
- Never publish real credentials, private keys, account numbers, or `.env` files. GitHub Pages cannot run this Node server; run it locally or deploy it to a suitable server after a full security review and proper identity, messaging, database, and payment-provider integrations.

