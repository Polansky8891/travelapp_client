export default {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": ["@swc/jest"],
    },
    moduleNameMapper: {
      "\\.(css|scss|jpg|png)$": "<rootDir>/jest-mock.js"
    }
  };
  