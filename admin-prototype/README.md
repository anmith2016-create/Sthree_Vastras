# Sthree Vastras · Admin & Delivery Demo

This Node.js prototype provides demo login, demo employee accounts, example delivery records, simulated OTP confirmation, and administrator access controls. It does not manage storefront clothing listings.

## Deploy a free hosted demo

Use the [Deploy to Render button](https://render.com/deploy?repo=https://github.com/anmith2016-create/Sthree_Vastras). Render reads the repository's `render.yaml`. During setup, provide:

- `DEMO_ADMIN_EMAIL`: the email for the demo administrator account.
- `DEMO_ADMIN_PASSWORD`: a new demo-only password, at least 12 characters long.

Do not reuse an important password. The demo itself does not send email or require shopper email verification. When deployment finishes, Render shows the service URL. The free service can sleep after 15 minutes of inactivity and may restart. Accounts, sessions, demo deliveries, and changes are in memory and may reset after sleep, restart, or redeploy.

## Run locally

Requires Node.js 20 or newer. No external packages are used.

In PowerShell:

```powershell
$env:DEMO_MODE = 'true'
$env:DEMO_ADMIN_EMAIL = 'your-demo-admin@example.test'
$env:DEMO_ADMIN_PASSWORD = 'use-a-new-local-demo-password'
node server.js
```

Open `http://127.0.0.1:3000`. New demo accounts get employee access; the administrator can review and suspend them. OTPs are simulated and shown in the demo. No messages are sent.

## Payments and production limits

Real payments are disabled. No wallet, payment processor, payout account, or transfer is connected. The example payout split is display-only. The demo server does not connect to the shop's browser-local listings.

Free hosting is intended for testing and preview, not production commerce. Secure production accounts and shared listings require persistent storage and further backend work. Real payments require an activated provider, server-side integration, verified webhooks, and business approval. No card, bank, or UPI data is collected here.
