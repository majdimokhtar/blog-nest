// module.exports = {
//   moduleFileExtensions: ['js', 'json', 'ts'],
//   rootDir: '.',
//   testRegex: '.*\\.spec\\.ts$',
//   transform: {
//     '^.+\\.(t|j)s$': 'ts-jest',
//   },
//   collectCoverageFrom: ['**/*.(t|j)s'],
//   coverageDirectory: './coverage',
//   testEnvironment: 'node',
// };
// module.exports = {
//   moduleFileExtensions: ['js', 'json', 'ts'],
//   rootDir: '.',
//   testRegex: '.*\\.spec\\.ts$',
//   transform: {
//     '^.+\\.(t|j)s$': 'ts-jest',
//   },
//   collectCoverageFrom: ['**/*.(t|j)s'],
//   coverageDirectory: './coverage',
//   testEnvironment: 'node',
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//   },
//   roots: ['<rootDir>/'],
// };

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['<rootDir>'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/'],
};
