/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "img.youtube.com",
      "static-cdn.jtvnw.net",
      "i.ytimg.com",
      "yt3.ggpht.com",
      "images.igdb.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "i2.hdslb.com",
      "i1.hdslb.com",
      "i0.hdslb.com",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "mode",
            value: "resetPassword",
          },
        ],
        permanent: false,
        destination: "/resetPassword",
      },
    ];
  },
};

module.exports = nextConfig
