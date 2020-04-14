import React, { Component } from "react";
import { Button } from "reactstrap";

class Profile extends Component {
  state = {
    currentUserId: sessionStorage.getItem("userID")
  };

  deleteUser = id => {
    fetch(`http://localhost:3001/user/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => this.saveSession(data))
      .then(this.setRedirect())
      .catch(err => console.log(err, "hi i am an error"));
  };

  handleDeleteUser = () => {
    this.deleteUser(this.state.currentUserId);
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleDeleteUser}>
          Delete your account with id {this.state.currentUserId}
        </Button>
      </div>
    );
  }
}

export default Profile;
