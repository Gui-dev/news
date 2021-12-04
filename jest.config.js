module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: [
    '<rootDir>/.jest/setupTests.ts'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  coverageReporters: ['json', 'lcov']
}
