const saveSession = (data) => {
  sessionStorage.setItem("userID", data.userID);
  sessionStorage.setItem("session_key", data.token);
  sessionStorage.setItem("username", data.username);
};

//Validate login

const validateLogIn = () => {
  const errors = {};

  if (this.state.username.trim() === "") {
    errors.username = "Username is required";
  }
  if (this.state.password.trim() === "") {
    errors.password = "Password is required";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

// Validate SignUp

const validateSignUp = () => {
  const errors = {};
  if (!this.state.email) {
    errors.email = "Email is required";
  }
  if (this.state.email !== this.state.confirm_email) {
    errors.confirm_email = "Email is different";
  }
  if (this.state.username.trim() === "") {
    errors.username = "Username is required";
  }
  if (this.state.password.trim() === "") {
    errors.password = "Password is required";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

module.exports = {
  saveSession,
  validateLogIn,
  validateSignUp,
};
