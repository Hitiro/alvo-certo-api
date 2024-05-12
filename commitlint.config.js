const { load } = require('@commitlint/config-core');
const config = load({
  extends: ['@commitlint/config-conventional'],
});

module.exports = config;
