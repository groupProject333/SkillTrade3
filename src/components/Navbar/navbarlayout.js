import React from 'react';
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


class NavEx extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">Skill-Trade</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
            {/* <NavItem>
                <Link
                  to="#"
                  id="navText"
                  onClick={this.logout}
                >
                  <span className = "text-success">
                  Logout
                  </span>
                </Link>
                </NavItem> */}
                <NavItem>
                <Link to="/">
                  <span id="navText" className = "text-success">
                  Skill-Trade Home
                  </span>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/login">
                  <span id="navText" className = "text-success">
                  Login
                  </span>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/signup">
                  <span id="navText" className = "text-success">Sign Up</span>
                </Link>
                </NavItem>
                <NavItem>
                <Link to="/browse">
                  <span id="navText" className = "text-success">Browse</span>
                </Link>
                </NavItem>
                {/* <NavItem>
                <Link to="/topcont" >
                  <span id="navText" className = "text-success">Top Contributors</span>
                </Link>
                </NavItem> */}
                <NavItem>
                <Link to="/profile" >
                  <span id="navText" className = "text-success">Profile</span>
                </Link>
                </NavItem>
                <NavItem>
                <Link to="/addListing">
                  <span id="navText" className = "text-success">Add a New Listing</span>
                </Link>
                </NavItem>
                <NavItem>
                <Link to="/messaging/" >
                  <span id="navText" className = "text-success">Messages</span>
                </Link>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

export default NavEx;