# singular-web-sdid-cross-domain-cross-browser-persistence

A lightweight solution for **persisting and transferring the Singular Device ID (`sdid`) across domains and browsers**. This enables robust attribution and context switching for Singular tracking.

## How It Works

- **parseSdidFromUrl.js**: Extracts a valid UUIDv4 `sdid` from the URL and stores it in `localStorage`.
- **appendSdidToWhitelistedLinks.js**: Appends the `sdid` as a query parameter to all links pointing to whitelisted domains (including the current domain).

## Quick Start

1. **Add both scripts to your project.**
2. **Call `parseSdidFromUrl()` before initializing your Singular Web SDK.**
3. **Use the Singular `.withInitFinishedCallback` to get the `sdid` and pass this to any dynamic links, email captures, or forms in the event the user will click a link outside of the browser. For example, if the user receives an email to confirm their account registration. You will want the `sdid` present on the link in their email. This is critical to persist the same `sdid` when the user return to the site, possibly on a different browser.**
4. **Call `appendSdidToWhitelistedLinks()` after the Singular WebSDK initializes.**

```html
<script src="parseSdidFromUrl.js"></script> 
<script> 
function initSingular() {
     parseSdidFromUrl();             // Handles sdid parsing and storage
     const config = new SingularConfig(sdkKey, sdkSecret, productId)
     .withInitFinishedCallback(initParams => {
        // Initialization is complete
       const singularDeviceId = initParams.singularDeviceId;
       // Use the device ID as needed
       // Pass this singularDeviceId value to dynamic links or other services as needed.
     });
     singularSdk.init(config);
     appendSdidToWhitelistedLinks(); // Handles dynamic rewrite of static links on the page
}
</script>
```

## Example

See `example.html` for a working demonstration:
- Visit the page with `?sdid=<valid-uuid-v4>` in the URL.
- All links to whitelisted domains will have `sdid` appended.
- Clicking these links will transfer the sdid, ensuring persistence across domains.

## Configuration

- Edit the `domainWhitelist` array in `appendSdidToWhitelistedLinks.js` to include all domains where you want the `sdid` to persist.

## Security Note

- Do not store sensitive or personally identifiable information in `localStorage`.
- Only valid UUIDv4 values are accepted as `sdid`.

## Real-life Example
Imagine a user lands on your site with ?sdid=123e4567-e89b-12d3-a456-426614174000. The script stores this value. All links to example.com, anotherdomain.com, or your current domain will now have ?sdid=123e4567-e89b-12d3-a456-426614174000 appended. When the user clicks one, the next site can pick up the same sdid, ensuring seamless tracking continuity.

## Action Steps
1. Copy all files into your new repo.
2. Adjust the whitelist as needed.
3. Open `example.html` in your browser and test with a valid sdid in the URL.

This setup gives you a robust, transparent way to maintain Singular attribution across any number of domains and browser sessions. 


## License

MIT License
