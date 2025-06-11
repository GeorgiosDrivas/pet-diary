const customJestConfig = {
  rootDir: "../",
  setupFilesAfterEnv: ["<rootDir>/jest/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^firebase/client$": "<rootDir>/__mocks__/firebase/client.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default customJestConfig;
