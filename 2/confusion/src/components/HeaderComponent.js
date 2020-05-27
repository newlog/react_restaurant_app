import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  Collapse,
  NavItem,
  NavbarToggler,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
    // make the toggleNav function available to render() without having to use arrow functions "() =>"
    // works fine when we do not need to pass parameters to the function
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    const { isNavOpen } = this.state;
    this.setState({
      isNavOpen: !isNavOpen,
    });
  }

  toggleModal() {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
    });
  }

  handleLogin(event) {
    // close the modal
    this.toggleModal();
    // eslint-disable-next-line no-alert
    alert(
      `Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`,
    );
    event.preventDefault();
  }

  render() {
    const { isNavOpen, isModalOpen } = this.state;
    return (
      <>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                height="30"
                width="41"
                alt="Ristorante Con Fusion"
              />
            </NavbarBrand>
            <Collapse isOpen={isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg" /> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg" /> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg" /> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg" /> Contact Us
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button outline onClick={this.toggleModal}>
                  <span className="fa fa-sign-in fa-lg mr-2" />
                   Login
                </Button>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante Con Fusion</h1>
                <p>
                  We take inspiration from the World&apos;s best cuisines, and
                  create a unique fusion experience. Our lipsmacking creations
                  will tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  // https://stackoverflow.com/questions/48413299/arrow-function-should-not-return-assignment
                  innerRef={(input) => {
                    this.username = input;
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => {
                    this.password = input;
                  }}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={(input) => {
                      this.remember = input;
                    }}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button
                type="submit"
                value="submit"
                color="primary"
                className="mt-2"
              >
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default Header;
