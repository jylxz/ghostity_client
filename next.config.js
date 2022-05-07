/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  compilier: {
    styledComponents: true,
  },
  images: {
    domains: ["static-cdn.jtvnw.net", "i.ytimg.com", "yt3.ggpht.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
