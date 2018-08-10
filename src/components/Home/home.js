import React, { Component } from "react";
import Search from "../Search";
import DemoCarousel from "../Carousel";
import Logo from "../Logo";
import {Container} from 'reactstrap';
  
class Home extends Component {
  
// if (loggedIn) {
  render() {
    return (
      <Container className="text-center">
        <Logo/>
          <DemoCarousel/>
          <Search/>
      </Container>
    );
  }
// }
}

export default Home;
