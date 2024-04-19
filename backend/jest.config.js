module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globalSetup: './tests/globalSetup.ts',
    globalTeardown: './tests/globalTeardown.ts'
  };
  