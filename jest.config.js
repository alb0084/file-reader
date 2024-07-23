module.exports = {
    roots: ['<rootDir>/BE/test', '<rootDir>/FE/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.vue$': 'vue-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'vue'],
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/FE/src/$1'
    },
    testEnvironment: 'node'
};
