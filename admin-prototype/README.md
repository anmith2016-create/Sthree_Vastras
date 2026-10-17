# Sthree Vastras Staff App

Employee-only Node.js prototype. There is no administrator account or shopper account flow. Employees can create their own account from the sign-in screen.

## Run locally

Requires Node.js 20 or newer. No external packages are used.

```powershell
node server.js
```

Employee passwords are hashed with scrypt. New accounts are held in server memory and reset when the service restarts. Add persistent storage and suitable account protections before relying on this app for real staff access.

## Disabled features

There are no demo accounts, sample deliveries, or simulated OTPs. Delivery, purchase sync, and OTP endpoints are disabled. The bank account screen does not collect bank details, connect to a payment provider, or make transfers.

Shopper accounts belong in the storefront. This staff app does not create shopper accounts.

## Deployment

GitHub Pages cannot run this Node server. The app is deployed through the configured Render service. Do not commit passwords or other secrets to GitHub.

