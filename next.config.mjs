/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration - standalone for Vercel/Hostinger with API routes
  output: 'standalone',
  trailingSlash: false,
  
  // Disable barrel optimization for react-icons
  experimental: {
    optimizePackageImports: [],
  },

  // Externalize heavy server-only packages
  serverExternalPackages: ['@google/generative-ai', 'tesseract.js', 'firebase-admin', 'firebase'],

  // TypeScript and ESLint settings
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },

  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // General server tweaks
  compress: true,
  poweredByHeader: false,

  // Webpack adjustments
  webpack: (config, { isServer, dev }) => {
    // Client-side polyfill handling
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        dns: false,
        os: false,
        path: false,
        stream: false,
        util: false,
        crypto: false,
        'react/jsx-runtime': 'react/jsx-runtime.js',
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
      };
    }
    
    // Handle module resolution issues
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './app',
    };

    config.module.rules.push({
      test: /\.m?js$/,
      resolve: { fullySpecified: false },
    });

    config.experiments = { ...config.experiments, topLevelAwait: true };

    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ },
      { file: /node_modules\/punycode/ },
      /Critical dependency/,
      /Failed to parse source map/,
    ];

    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
