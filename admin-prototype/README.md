# Sthree Vastras Admin

Admin-only Node.js prototype. Demo OTP generation, demo deliveries, and open sign-up have been removed. The admin app does not create buyer accounts itself.

## Run locally

Requires Node.js 20 or newer. No external packages are used. Set an administrator credential in the local shell or a server-side secret manager, then start the app:

```powershell
$env:ADMIN_EMAIL = 'admin@example.com'
$env:ADMIN_PASSWORD = 'use-a-unique-password-of-at-least-12-characters'
node server.js
```

The admin password is hashed with scrypt at startup. Do not use a real credential from another service. The configured account is the only account this prototype seeds. There is no customer sign-up route. Existing Render setups may still use the older `DEMO_ADMIN_*` secret names for admin login only; these names no longer enable any demo data, OTP, or customer-account features.

## Buyer accounts and deliveries

There are no fake buyer accounts, sample deliveries, or simulated OTP codes. Buyer accounts should appear only after a verified shopping-app purchase. That purchase/authentication integration is not implemented yet; until it is connected, the buyers list is empty and purchase, delivery, and OTP endpoints remain disabled.

Before integration, the shopping app needs to send signed, verified purchase events through a backend, with persistent storage and an account activation flow. Delivery OTPs require a real messaging provider. Do not accept unsigned order details from a browser as proof of purchase.

## Bank onboarding and transfers

The screen offers Savings and Current account type selectors, but does not ask for account numbers, IFSC codes, or bank credentials. Provider-hosted onboarding is not connected; no bank data is transmitted or stored, and all transfers and allocation rules are disabled.

## Deployment

This repository contains source code, not a live service. GitHub Pages cannot run this Node server. A deployment needs a Node hosting provider, persistent storage, production identity/authentication, the verified shopping-app integration, a messaging provider for real OTPs, and a configured payment provider. Configure secrets only in the hosting provider's secret manager and require HTTPS.

