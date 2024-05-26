module.exports = {
    preset: "@vue/cli-plugin-unit-jest",
    transformIgnorePatterns: ["node_modules/(?!axios)"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs"
      },
  };
  