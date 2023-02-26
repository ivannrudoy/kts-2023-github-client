const isE2E = process.env.TEST_MODE === "e2e";
// eslint-disable-next-line no-console

const makeCfg = () => {
  /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
  const cfg = {};
  cfg.preset = !isE2E ? "ts-jest" : "jest-puppeteer";
  if (!isE2E) {
    cfg.testEnvironment = "jsdom";
    cfg.moduleNameMapper = {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/src/mocks/fileMock.js",
      "\\.(css|scss)$": "identity-obj-proxy",
      "^@components/(.*)$": "<rootDir>/src/components/$1",
      "^@utils/(.*)$": "<rootDir>/src/utils/$1",
      "^@store/(.*)$": "<rootDir>/src/store/$1",
      "^@config/(.*)$": "<rootDir>/src/config/$1",
      "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    };
    cfg.testPathIgnorePatterns = ["<rootDir>/src/e2e"];
    cfg.transform = {
      "\\.(ts|tsx)$": [
        "ts-jest",
        {
          babelConfig: "babel.config.js",
        },
      ],
    };
  } else {
    cfg.testMatch = ["<rootDir>/src/e2e/*.test.ts"];
  }
  return cfg;
};

module.exports = makeCfg();
