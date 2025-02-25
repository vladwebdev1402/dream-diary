/** @type { import('lint-staged').Config } */
module.exports = {
  '*.{ts,tsx}': 'npm run lint',
  '*.{ts,tsx,css,scss}': 'npm run prettier',
};
