/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://vghostity.com",
  generateRobotsTxt: true, // (optional)
  // ...other options
  exclude: ["/resetPassword", "/account"],
};

export default config;
