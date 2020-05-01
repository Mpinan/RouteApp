const saveSession = (data) => {
  sessionStorage.setItem("userID", data.userID);
  sessionStorage.setItem("session_key", data.token);
  sessionStorage.setItem("username", data.username);
};

module.exports = {
  saveSession,
};
