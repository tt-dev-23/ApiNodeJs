const { customAlphabet } = require("nanoid");
const { alphanumeric } = require("nanoid-dictionary");

function getId() {
  const nanoid = customAlphabet(alphanumeric, 6);
  return nanoid();
}

console.log(getId());
