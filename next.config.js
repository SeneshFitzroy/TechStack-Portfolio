/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    disableStaticImages: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true, // Disable Next.js image optimization for local images
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allow cross-origin requests
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  webpack(config) {
    // Modified to allow FontAwesome icons and static assets
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            emitFile: false,
            name: '[path][name].[ext]',
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
