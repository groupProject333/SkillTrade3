import React, { Component } from "react";
import Search from "../Search";
import DemoCarousel from "../Carousel";
import Logo from "../Logo";
  
class Home extends Component {
  
// if (loggedIn) {
  render() {
    return (
      <div>
        <Logo/>
          <DemoCarousel/>
          <Search/>
      </div>
    );
  }
// }
}

export default Home;
