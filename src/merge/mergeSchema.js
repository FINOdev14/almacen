const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const path = require('path');

const typesArray = loadFilesSync(path.join(__dirname, '..','schemas'),{extensions: ['js']});

module.exports = mergeTypeDefs(typesArray);