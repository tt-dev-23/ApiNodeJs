const { nanoid } = require("nanoid");

module.exports = {
  getId: () => {
    return nanoid(6);
  },
};
