# Sthree Vastras Admin

Admin and employee Node.js prototype. Demo OTP generation, demo deliveries, shopper account creation, and open sign-up are off. This app is for staff accounts only.

## Run locally

Requires Node.js 20 or newer. No external packages are used. Set an administrator credential in the local shell or a server-side secret manager, then start the app:

```powershell
$env:ADMIN_EMAIL = 'admin@example.com'
$env:ADMIN_PASSWORD = 'use-a-unique-password-of-at-least-12-characters'
node server.js
```

The admin password is hashed with scrypt at startup. Do not use a real credential from another service. The configured account is the only account this prototype seeds. After signing in, an administrator can use **People & access → Add employee account** to create employees. Employees receive only the employee role. Existing Render setups may still use the older `DEMO_ADMIN_*` secret names for admin login only; these names no longer enable any demo data, OTP, or customer-account features.

## Employee accounts, shoppers, and deliveries

There are no fake accounts, sample deliveries, or simulated OTP codes. The administrator creates employee accounts in **People & access**; each new account receives the employee role. There is no shopper sign-up or shopper account creation in this admin app. Purchase, delivery, and OTP endpoints remain disabled.

Any future shopper or purchase integration belongs in the shopping app and its backend. Delivery OTPs require a real messaging provider. Do not accept unsigned order details from a browser as proof of purchase.

## Bank onboarding and transfers

The screen offers Savings and Current account type selectors, but does not ask for account numbers, IFSC codes, or bank credentials. Provider-hosted onboarding is not connected; no bank data is transmitted or stored, and all transfers and allocation rules are disabled.

## Deployment

Employee accounts are held in server memory and reset when the service restarts; use persistent storage before relying on this for real staff access. GitHub Pages cannot run this Node server. Configure secrets only in the hosting provider's secret manager and require HTTPS.

