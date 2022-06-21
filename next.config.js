/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  compilier: {
    styledComponents: true,
  },
  images: {
    domains: [
      "img.youtube.com",
      "static-cdn.jtvnw.net",
      "i.ytimg.com",
      "yt3.ggpht.com",
      "images.igdb.com",
      "www.vshojo.com",
      "static.wixstatic.com",
      "www.nijisanji.jp",
      "vspo.jp",
      "custom-images.strikinglycdn.com",
      "voms.net",
      "www.v-react.com",
      "noripro.jp",
      "d20dfxyuz7q532.cloudfront.net",
      "hololive.hololivepro.com",
      "holostars.hololivepro.com",
      "neo-porte.jp",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
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
