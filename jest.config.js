export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    }
  };