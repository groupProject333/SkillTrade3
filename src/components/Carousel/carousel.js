import React, {Component} from "react";
import { Carousel } from "react-responsive-carousel";
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.css'
import "./carousel.css"


class DemoCarousel extends Component {
    render() {
        return (
        <section id="caro">
            <Carousel autoPlay showArrows={true} showStatus={false} showThumbs = {false} infiniteLoop={true} transitionTime="5" dynamicHeight={true}>
                <div>
                    <img src={require('../Images/skill1.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill.jpg')} />
                    {/* <p className=" legend">Welcome to Skill-Trade</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill10.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/advice3.jpg')} />
                    {/* <p className=" legend">Welcome to Skill-Trade</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill8.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill6.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill13.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/advice2.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill9.jpg')} />
                    {/* <p className=" legend">Welcome to Skill-Trade</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill3.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill2.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/advice.jpg')} />
                    {/* <p className=" legend">Welcome to Skill-Trade</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill5.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill4.jpg')} />
                    {/* <p className=" legend">Welcome to Skill-Trade</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill11.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/advice4.jpg')} />
                    {/* <p className=" legend">Welcome to Skill-Trade</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill7.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require('../Images/skill12.jpg')} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
            </Carousel>
        </section>
    );
  }
};

export default DemoCarousel;
