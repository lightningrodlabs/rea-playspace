/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  "roots": [
    "<rootDir>/test"
  ],
  "testMatch": [
    "**/test/**/*.spec.+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}