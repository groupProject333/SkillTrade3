import React, { Component } from "react";
import { Container, Card } from 'reactstrap';
import "./footer.css";

class Footer extends Component {
    render (){
        return(
        <section id="foot">
        <Container>
                <h4 id= "footText" className="text-center">
                    Bringing Community Members Together since 2018.
                </h4>
        </Container>
    </section>
        )
    }
};


export default Footer;