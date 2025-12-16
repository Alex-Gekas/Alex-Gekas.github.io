---
title: Create & Test a Custom Payment Gateway in WooCommerce
tags:
  - tutorial
  - WooCommerce
---

# Create & Test a Custom Payment Gateway in WooCommerce

## Overview

This tutorial is for intermediate WordPress developers who have built plugins before. You should be familiar with:

- PHP and basic OOP concepts  
- WordPress plugin structure (folders, activation, hooks)  
- WooCommerce payment settings and order flow  
- Basic understanding of callbacks or webhooks  

By the end of this tutorial, you'll be able to:

- Create and register a custom WooCommerce payment gateway  
- Add admin-side settings fields  
- Implement a working `process_payment()` function  
- Test your gateway locally in an environment such as LocalWP  

!!! info
    This is a **minimal working example** — ideal for learning or building custom internal payment logic.

---

## Background

WooCommerce allows you to enable existing payment gateways like Stripe or PayPal through the dashboard. But sometimes you need logic that can only be created at the **code** level.

This tutorial walks you through building a custom gateway plugin that contains:

```
wc-gateway-sample/
├── wc-gateway-sample.php
└── includes/
    └── class-wc-gateway-custom.php
```

Use this approach when:

- A payment provider doesn’t offer a WooCommerce extension  
- You need specialized validation, conditional behavior, or a sandbox gateway  
- You’re integrating an internal API or simple payment workflow  

!!! note
    The code in this tutorial works as a “dummy gateway” — it marks payments complete without contacting an external API.

---

## Prerequisites

Ensure you have:

- A local WordPress environment (LocalWP, XAMPP, Docker, etc.)
- WooCommerce installed and activated  
- Access to the plugin directory (`wp-content/plugins/`)  
- `WP_DEBUG` enabled  
- PHP 8.0+  

---

# Step 1 — Create the Plugin Folder and Main File

## Create the plugin folder

Create:

```
wp-content/plugins/wc-gateway-sample
```

## Add the main plugin file

Create:

```
wc-gateway-sample.php
```

Paste the following:

```php
<?php
/**
 * Plugin Name: WC Custom Gateway
 * Description: A minimal custom payment gateway example.
 * Version:     0.1
 * Author:      Alex Gekas
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
```

Your folder should now look like:

```
wc-gateway-sample/
└── wc-gateway-sample.php
```

---

# Step 2 — Load Your Gateway Class After WooCommerce

We must ensure WooCommerce loads first. Use the `plugins_loaded` hook with priority `11`.

```php
add_action( 'plugins_loaded', 'wc_custom_gateway_init', 11 );

function wc_custom_gateway_init() {
    if ( ! class_exists( 'WC_Payment_Gateway' ) ) {
        return;
    }

    require_once dirname( __FILE__ ) . '/includes/class-wc-gateway-custom.php';
}
```

---

# Step 3 — Register the Gateway With WooCommerce

```php
add_filter( 'woocommerce_payment_gateways', 'wc_add_custom_gateway' );

function wc_add_custom_gateway( $methods ) {
    $methods[] = 'WC_Gateway_Custom';
    return $methods;
}
```

---

# Step 4 — Define Gateway Constructor Settings

```php
public function __construct() {
    $this->id                 = 'custom_gateway';
    $this->method_title       = __( 'Custom Gateway', 'woocommerce' );
    $this->method_description = __( 'A simple custom payment method.', 'woocommerce' );
    $this->has_fields         = false;

    $this->init_form_fields();
    $this->init_settings();

    $this->title       = $this->get_option( 'title' );
    $this->description = $this->get_option( 'description' );

    add_action(
        'woocommerce_update_options_payment_gateways_' . $this->id,
        array( $this, 'process_admin_options' )
    );
}
```

---

# Step 5 — Add Admin Settings Fields

```php
public function init_form_fields() {
    $this->form_fields = array(
        'enabled' => array(
            'title'   => __( 'Enable/Disable', 'woocommerce' ),
            'type'    => 'checkbox',
            'label'   => __( 'Enable Custom Gateway', 'woocommerce' ),
            'default' => 'no',
        ),
        'title' => array(
            'title'       => __( 'Title', 'woocommerce' ),
            'type'        => 'text',
            'description' => __( 'Controls the payment method title customers see.', 'woocommerce' ),
            'default'     => __( 'Custom Payment', 'woocommerce' ),
        ),
        'description' => array(
            'title'       => __( 'Description', 'woocommerce' ),
            'type'        => 'textarea',
            'description' => __( 'Description shown at checkout.', 'woocommerce' ),
            'default'     => __( 'Pay using the custom gateway.', 'woocommerce' ),
        ),
    );
}
```

---

# Step 6 — Process Payments

```php
public function process_payment( $order_id ) {
    $order = wc_get_order( $order_id );

    $order->payment_complete();

    return array(
        'result'   => 'success',
        'redirect' => $this->get_return_url( $order ),
    );
}
```

---

# Step 7 — Test the Gateway at Checkout

1. Enable the gateway in **WooCommerce → Settings → Payments**  
2. Configure title and description  
3. Add a product to cart  
4. Test checkout in an incognito browser  

---

# Step 8 — Test End-to-End

1. Place an order with **Custom Gateway**  
2. Confirm order status in **WooCommerce → Orders**  

---

# Summary

You learned how to:

- Load a gateway safely using `plugins_loaded`  
- Register a payment method  
- Add admin settings  
- Implement `process_payment()`  
- Test end-to-end checkout  

---

# Next Steps

Expand your gateway with:

- API integrations  
- Webhooks  
- Logging  
- Custom checkout fields  
- A dedicated settings page  

