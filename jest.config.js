module.exports = {
  setupFiles: [
    '<rootDir>/mock/LocalStorageMock'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/test/'
  ],
  coveragePathIgnorePatterns: [
    'LocalStorageMock'
  ]
};
