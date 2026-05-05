---
title: Case Study: WooCommerce Order Status & Emails
---
# Case Study: WooCommerce Order Status & Emails

## The problem

WooCommerce ships with a fixed set of order statuses. Stores that need a
holding state — for fraud checks, inventory confirmation, or support
investigations — have no built-in option. I chose this as a tutorial
subject because the problem is real and there is little documentation about it.

## Decisions I made

**HPOS compatibility.** WooCommerce's High-Performance Order Storage
(HPOS) uses a different admin screen URL than the legacy post-based orders
screen. I scoped the bulk action implementation explicitly to
`woocommerce_page_wc-orders` so it targets the current architecture rather
than the legacy one.

**Email trigger design.** I routed the trigger through a custom
`do_action()` hook (`wc_cos_trigger_awaiting_review_email`) instead of
calling the email class directly from the admin action handler. This
keeps the admin UI wiring independent of the email implementation, so
either side can change without breaking the other.

**Duplicate-send safeguard.** Automatic triggers fire every time an order changes status, which means a staff member re-saving an order already in
Awaiting Review would send the email twice. I added an order meta flag
(`_wc_cos_awaiting_review_email_sent`) that prevents repeat sends without
requiring any UI change.

**Order note logging.** Both the manual and automatic send paths log an order note. Store staff
can see when the email was sent and why, without using additional tools.

## What this demonstrates

This tutorial required more than documenting steps. Each decision — 
decoupling the email trigger, targeting HPOS, preventing duplicate sends — 
had a reason, and explaining that reasoning is what makes documentation useful.