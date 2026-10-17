# Sthree Vastras

A responsive storefront preview published on GitHub Pages.

## Storefront

[Open the shop](https://anmith2016-create.github.io/Sthree_Vastras/)

Shopper accounts, carts, settings, and seller listings are stored in the current browser only. Listings do not sync to other shoppers or devices. No email verification is required.

## Admin app

[Admin app source and setup](https://github.com/anmith2016-create/Sthree_Vastras/tree/main/admin-prototype)

The admin app has administrator and employee accounts only. There is no shopper sign-up in the admin app. The administrator creates employee accounts from **People & access**; employees receive the employee role. Demo OTPs, sample deliveries, and open sign-up are disabled. The administrator account is configured through the hosting provider's `ADMIN_EMAIL` and `ADMIN_PASSWORD` secrets. Never use a password from another account or commit secrets to GitHub.

Shopper accounts belong to the storefront. They are not imported into the admin app, and the admin app does not create shopper accounts. Delivery, OTP, and purchase integration remain disabled until real services are configured.

## Payments and publishing

The storefront is static. The Node.js admin app is configured for Render in [render.yaml](render.yaml). GitHub Pages cannot run its server. Payout onboarding and all money transfers are disabled until a payment provider is configured. No 90/10 split is shown as a live rule.
