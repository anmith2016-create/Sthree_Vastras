# Sthree Vastras

A responsive storefront preview published on GitHub Pages.

## Storefront

[Open the shop](https://anmith2016-create.github.io/Sthree_Vastras/)

Shopper accounts, carts, settings, and seller listings are stored in the current browser only. Listings do not sync to other shoppers or devices. No email verification is required.

## Admin app

[Admin app source and setup](https://github.com/anmith2016-create/Sthree_Vastras/tree/main/admin-prototype)

The admin app has demo OTPs, sample deliveries, and open sign-up turned off. It seeds only the administrator account configured through the hosting provider's `ADMIN_EMAIL` and `ADMIN_PASSWORD` secrets. Never use a password from another account or commit secrets to GitHub.

Buyer accounts are not created in the admin app. They should be added only through a verified shopping-app purchase integration. That integration is not connected yet, so the admin buyer list is empty and delivery/OTP service endpoints remain disabled. Do not treat an unsigned browser checkout as proof of purchase.

## Payments and publishing

The storefront is static. The Node.js admin app is configured for Render in [render.yaml](render.yaml). GitHub Pages cannot run its server. Payout onboarding and all money transfers are disabled until a payment provider is configured. No 90/10 split is shown as a live rule.
