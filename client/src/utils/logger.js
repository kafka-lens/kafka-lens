import { remote } from 'electron';

const { DEBUG } = remote.getGlobal('process').env;

export default {
  log(...args) {
    if (DEBUG) console.log(...args);
  },

  error(...args) {
    if (DEBUG) console.error(...args);
  },
};
