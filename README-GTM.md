**This `README-GTM.md` file** covers the specifics for Google Tag Manager (GTM) users versus those integrating the native Singular WebSDK. It emphasizes the need to use Custom HTML Tags without the provided JS snippet and guides users on ordering/tag management.

# Google Tag Manager (GTM) Integration Guide

This guide explains how to use **singular-web-sdid-cross-domain-cross-browser-persistence** with **Singular’s Google Tag Manager (GTM) SDK integration**, and clarifies why certain initialization code—necessary in native deployments—should not be used with GTM templates.

## When to Use This Guide

- **Use these instructions if you deploy the Singular WebSDK via Google Tag Manager (GTM) templates,** not with direct/native JS integration.  
- If you use the **native** WebSDK (direct JavaScript), please refer to the [main README](./README.md).

## Key Differences: Native SDK vs. GTM Template

| Aspect                                      | Native SDK (Direct)                                                      | GTM Template Integration                          |
|----------------------------------------------|--------------------------------------------------------------------------|---------------------------------------------------|
| **SingularConfig/init code needed?**         | **Yes**: Required in main HTML/JS file before SDK use                    | **No**: Do **not** use SingularConfig/init code   |
| **How to inject sdid persistence logic?**    | Import/call from JS file before SingularConfig/init                      | Use GTM **Custom HTML Tag(s)**                    |
| **Ordering required?**                       | Call before Singular SDK initialization                                  | Trigger Custom HTML Tag(s) **before** Singular Tag|

## 📋 Instructions for GTM Integration

### 1. **Create Custom HTML Tag(s) for sdid Logic**

- Copy the sdid logic from this repo (e.g., scripts for `parseSdidFromUrl()`, `appendSdidToWhitelistedLinks()`).
- **Do _not_ include:**
  ```js
  const config = new SingularConfig(...);
  singularSdk.init(config);
  ```
  (That’s only for native/direct integration. GTM handles SDK init via its templates.)

- Paste script(s) into GTM as a **Custom HTML Tag.**

### 2. **Trigger BEFORE Singular Init Tag**

- Go to **Tag Sequencing** or use GTM Triggers to ensure your Custom HTML Tag fires **before** the Singular template tag initializes.
- This ensures the device ID (sdid) is present in localStorage and URL as needed for Singular.

### 3. **Configure Your Domain Whitelist**

- Edit sdid script to include all allowed partner domains as usual.

### 4. **Consent Requirements**

- **GDPR/EU users:**  
  - If storing device IDs or analytics/tracking IDs, ensure user consent is obtained before running these scripts.
  - Use Consent Initialization triggers in GTM where appropriate.

### 5. **Testing**

- Preview/tag-assistant mode in GTM to ensure proper sequencing and sdid persistence.

## ❌ DO NOT Do This in GTM

You **should NOT** use the following code snippet inside GTM:
```js
const config = new SingularConfig(...);
singularSdk.init(config);
```
The Singular GTM template manages initialization; injecting this code might cause conflicts or double-initialization.

## Troubleshooting

- If sdid isn’t present on outbound links, verify the Custom HTML fires **before** the Singular Init Tag.
- If attribution breaks, re-check triggers/ordering and domain whitelist in the sdid script.
- For issues with user consent, ensure tags do not fire before consent is granted.
