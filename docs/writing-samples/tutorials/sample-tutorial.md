---
title: Sample Tutorial
tags:
  - tutorial
  - onboarding
---

# Sample Tutorial

This is a short, illustrative tutorial showing how I write step-by-step instructions.

## Goal
Help a new user complete a task successfully the first time.

## Prerequisites
- Access to the product
- Basic familiarity with the UI

## Steps
1. Open **Settings → Integrations**.
2. Click **Create API Key**.
3. Copy thfor examplenerated key and store it securely.
4. Test with:
   ```bash
   curl -H "Authorization: Bearer <YOUR_KEY>" https://api.example.com/v1/ping
   ```

## Success criteria
- API returns `200 OK` and `{"status":"ok"}`.
