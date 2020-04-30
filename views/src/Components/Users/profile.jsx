import React, { Component } from "react";
import { Container, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  state = {
    redirect: false,
    modal: false,
    currentUserId: sessionStorage.getItem("userID"),
  };

  deleteUser = (id) => {
    fetch(`http://localhost:3001/user/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token token=" + sessionStorage.getItem("session_key"),
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err, "hi i am an error"));
  };

  handleDeleteUser = () => {
    sessionStorage.clear();
    this.deleteUser(this.state.currentUserId);
    this.handleModal();
    this.setRedirect();
  };

  handleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  setRedirect() {
    this.setState({
      redirect: true,
    });
  }

  renderRedirectAfterLogIn() {
    if (this.state.redirect) {
      return <Redirect to={`/home`} />;
    }
  }

  render() {
    const { modal } = this.state;
    return (
      <Container>
        <Button color="danger" onClick={this.handleModal}>
          Delete your account with id {this.state.currentUserId}
        </Button>
        <Modal isOpen={modal} toggle={this.handleModal}>
          <ModalBody>Are you sure you want to delete your account?</ModalBody>
          <ModalFooter>
            {this.renderRedirectAfterLogIn()}
            <Button color="danger" onClick={this.handleDeleteUser}>
              Delete
            </Button>
            <Button color="secondary" onClick={this.handleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default Profile;
