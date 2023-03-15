module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.test.{ts,tsx,js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
}
