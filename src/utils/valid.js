const valid = (name, email, password, confirmPassword) => {
  if (!name || !email || !password) {
    return "Please enter all the fields";
  }
  if (!validateEmail(email)) {
    return "Invalid Email";
  }

  if (password?.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (password !== confirmPassword) {
    return "Passwords did not match.";
  }
};

function validateEmail(email) {
  const isValid =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return isValid.test(email);
}

export default valid;
