# Sthree Vastras

A responsive storefront preview published on GitHub Pages.

## Storefront

[Open the shop](https://anmith2016-create.github.io/Sthree_Vastras/)

Shopper accounts, carts, settings, and seller listings are stored in the current browser only. Listings do not sync to other shoppers or devices. No email verification is required.

## Staff app

[Staff app source and setup](https://github.com/anmith2016-create/Sthree_Vastras/tree/main/admin-prototype)

The staff app has employee accounts only. Employees can create accounts from the sign-in screen; there is no administrator account or shopper sign-up in this app. Passwords are hashed with scrypt. Demo OTPs, sample deliveries, purchase sync, and delivery flows are disabled.

## Payments and publishing

The storefront is static. The Node.js staff app is configured for Render in [render.yaml](render.yaml). GitHub Pages cannot run its server. Payout onboarding and all money transfers are disabled until a payment provider is configured. No 90/10 split is shown as a live rule.
