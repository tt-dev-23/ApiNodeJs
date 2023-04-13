const { customAlphabet } = require("nanoid");
const { alphanumeric } = require("nanoid-dictionary");

module.exports = {
  getId: () => {
    const nanoid = customAlphabet(alphanumeric, 6);
    return nanoid();
  },
};
