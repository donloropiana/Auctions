/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '')}`,
        port: '',
        // pathname: '/storage/v1/object/public/**',
        pathname: '/storage/v1/**',  // Changed to allow signed URLs
      },
    ],
  },
}

export default nextConfig
