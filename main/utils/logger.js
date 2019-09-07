const { DEBUG } = process.env;

module.exports = {
  log(...args) {
    if (DEBUG) console.log(...args);
  },

  error(...args) {
    if (DEBUG) console.error(...args);
  },
};
