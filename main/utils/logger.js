module.exports = {
  log(...args) {
    if (process.env.DEBUG !== 'false') console.log(...args);
  },

  error(...args) {
    if (process.env.DEBUG !== 'false') console.error(...args);
  }
}