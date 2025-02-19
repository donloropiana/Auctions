/**
 * Get the current URL with a trailing slash.
 */
export function getBaseUrl() {
    let url =
      process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/'
  
    // Include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
  
    // Include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    return url
  }
  