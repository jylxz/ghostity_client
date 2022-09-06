// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "@general/*": ["./components/General/*"],
    "@images/*": ["./public/assets/images/*"],
    "@icons/*": ["./public/assets/icons/*"],
    "@logo/*": ["./public/assets/logo/*"],
  },
};

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG stub first
      "\\.svg": "<rootDir>/__mocks__/svg.tsx",
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

module.exports = jestConfig;
