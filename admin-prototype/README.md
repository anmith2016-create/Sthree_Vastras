# Sthree Vastras · Payout Account Setup

Node.js backend prototype for account login, delivery confirmation, admin controls, and payout account onboarding.

## Run locally

Requires Node.js 20 or newer. No external packages are used.

The application starts with demo mode **off**. To run the local preview with example delivery data and simulated OTPs, explicitly enable demo mode before starting:

```powershell
$env:DEMO_MODE = 'true'
$env:DEMO_ADMIN_EMAIL = 'your-demo-admin@example.test'
$env:DEMO_ADMIN_PASSWORD = 'use-a-new-local-demo-password'
node server.js
```

Open `http://127.0.0.1:3000`. New demo accounts get employee access; the administrator can review and suspend them.

For production, use `NODE_ENV=production` with `ADMIN_EMAIL` and `ADMIN_PASSWORD` stored in a server-side secret manager. Production never reads `DEMO_*` credentials. Replace any password that may be a real credential before deployment.

## Bank account setup

The payout screen offers both Savings and Current account types. The app does not ask for account numbers, IFSC codes, or bank credentials. Once a payment provider is selected and configured, the “Continue to secure setup” action should open that provider's hosted onboarding page so the provider collects and verifies bank details.

That provider integration is not connected yet. The button remains disabled, and no bank data is transmitted or stored. Production API routes return a configuration error instead of returning fake deliveries, simulated OTPs, or demo admin actions.

## Live service requirements

This repository is source code, not a live service. GitHub Pages cannot run the Node server. A production deployment still needs a hosted Node service, persistent identity/data storage, an OTP delivery provider, a selected and activated payment provider, verified webhooks, and business approval for any payout split. No real transfers are implemented.

The 90% administrator / 10% employee split remains an example only in explicitly enabled local demo mode. Production shows no split until provider and business rules are configured.

Passwords use Node's scrypt hashing. Session cookies are HttpOnly and SameSite=Strict; a remote deployment also requires HTTPS. Accounts and sessions in the local prototype are held in memory and reset when the server stops.

