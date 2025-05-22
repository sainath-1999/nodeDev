const validator = require("validator");

function validateSignUpData(req) {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!!!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be strong");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
}

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "age", "gender", "about", "photoUrl", "skills"]

  const isEditAllowedOnlyFor = Object.keys(req.body).every(field => allowedEditFields.includes(field));

  return isEditAllowedOnlyFor;

}


module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
