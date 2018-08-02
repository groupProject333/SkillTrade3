import React from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap';
import "./jumbo.css";

const Jumbo = (props) => {
    return (
        <section id="back">
            <Jumbotron id="jumboText">
            <Container>
                <Row>
                    <Col>
                <h1 className="display-2 text-center text-primary">
                    Welcome to Skill-Trade!
                </h1>
                </Col>
                <Col>
                <h2 className="text-center">
                What do you want to do today?
                </h2>
                </Col>
                <Col>
                <div className="text-center" id="contButton">
                    <Button color="primary" size="lg" block id="btn">
                    Browse the Current Listings
                    </Button>
                    <Button color="primary" size="lg" block id="btn">
                    Create a New Listing
                    </Button>
                </div>
                </Col>
                </Row>
                </Container>
            </Jumbotron>
        </section>
    );
};

export default Jumbo;