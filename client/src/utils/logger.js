const DEBUG = false;

export default {
  log(...args) {
    if (DEBUG) console.log(...args);
  },

  error(...args) {
    if (DEBUG) console.error(...args);
  },
};
