// singular-web-sdid-cross-domain-cross-browser-persistence: parseSdidFromUrl.js

"use strict";
// Checks if a string is a valid UUIDv4
function isValidUuidV4(uuid) {
  const pattern = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
  return pattern.test(uuid);
}

// Parses sdid from URL or localStorage and persists it if valid
function parseSdidFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    let sdid = params.get('sdid');
    if (sdid && isValidUuidV4(sdid)) {
      localStorage.setItem('global_singular_id', sdid);
    } else {
      sdid = localStorage.getItem('global_singular_id');
    }
    return sdid || null;
  } catch (error) {
    return null;
  }
}

