"use strict";
/**
 * Appends the sdid from localStorage to all <a> links with hostnames in the whitelist.
 * Supports both exact matches and subdomains.
 */
function appendSdidToWhitelistedLinks() {
  const sdid = localStorage.getItem('global_singular_id');
  if (!sdid) return;

  const domainWhitelist = [
    window.location.hostname, // Always include current domain
    'example.com',
    'anotherdomain.com'
    // Add more as needed
  ];

  const links = document.getElementsByTagName('a');
  for (let link of links) {
    try {
      if (!link.href) continue;
      const url = new URL(link.href, window.location.origin);
      // Allow exact matches and subdomains
      if (
        domainWhitelist.some(domain =>
          url.hostname === domain || url.hostname.endsWith('.' + domain)
        )
      ) {
        url.searchParams.set('sdid', sdid);
        link.href = url.toString();
      }
    } catch (e) {
      continue;
    }
  }
}
