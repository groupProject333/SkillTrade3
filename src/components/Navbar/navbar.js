import React, { Component, PropTypes } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import axios from "axios";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"; // https://reactstrap.github.io/components/navbar/

class Navbar2 extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      username: "pop",
      isOpen: false
    };
    this.logout = this.logout.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  // constructor(props) {
  //   super(props);

  //   this.toggleNavbar = this.toggleNavbar.bind(this);
  //   this.state = {
  //     collapsed: true
  //   };
  // }

  // toggleNavbar() {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // }

  logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error");
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log("navbar render, props: ");
    console.log(this.props);

    return (
      <section>
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Skill Trade</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {loggedIn ? (
                  <section className="float-left">
                    <NavItem className='logoutBtn'>
                      <Link to="#" id="navText" onClick={this.logout}>
                        <span className="text-success logoutBtn">Logout</span>
                      </Link>
                    </NavItem>
                  </section>
                ) : (
                  <section>
                    <section className="float-left">
                      <NavItem className='loginBtn'>
                        <Link to="/login">
                          <span id="navText" className="text-success">
                            Login
                          </span>
                        </Link>
                      </NavItem>
                    </section>
                    <section className="float-right">
                      <NavItem className='signupBtn'>
                        <Link to="/signup">
                          <span id="navText" className="text-success">
                            Sign-Up
                          </span>
                        </Link>
                      </NavItem>
                    </section>
                  </section>
                )}
                <NavItem>
                  <NavLink
                    target="_blank"
                    id= "navText"
                    href="https://github.com/groupProject333/SkillTrade2"
                  >
                    GitHub
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <span id="navText" className="text-success">
                      Options
                    </span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavItem>
                        <Link to="/browse">
                          <span id="navText" className="text-success">
                            Browse
                          </span>
                        </Link>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem>
                      <NavItem>
                        <Link to="/profile">
                          <span id="navText" className="text-success">
                            Profile
                          </span>
                        </Link>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem>
                      <NavItem>
                        <Link to="/addListing">
                          <span id="navText" className="text-success">
                           New Listing
                          </span>
                        </Link>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem>
                      <NavItem>
                        <Link to="/messaging/">
                          <span id="navText" className="text-success">
                            Messages
                          </span>
                        </Link>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
      </section>
    );
  }
}

export default Navbar2;
