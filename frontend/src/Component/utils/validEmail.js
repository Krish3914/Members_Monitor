const validator = require('validator');

function isValidEmail(email) {
  return validator.isEmail(email);
}

export default isValidEmail;