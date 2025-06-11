// jest.config.ts
import nextJest from "next/jest";
import { Config } from "jest";

// const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  rootDir: "./",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^firebase/client$": "<rootDir>/__mocks__/firebase/client.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default customJestConfig;
