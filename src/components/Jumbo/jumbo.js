import React from 'react';
import { Card, CardHeader, CardBody, Button, Container, Row, Col } from 'reactstrap';
import "./jumbo.css";

const Jumbo = (props) => {
    return (
        <section id="back">
            <Container>
                <Card>
                    <CardHeader>
                <h1 className="text-center text-info">
                    Welcome to Skill-Trade!
                </h1>
                </CardHeader>
                <CardBody>
                <h2 className="text-center text-info">
                What do you want to do today?
                </h2>
                <div className="text-center">
                    <Button border color="info" size="lg" block id="btn">
                    Browse the Current Listings
                    </Button>
                    <Button border color="info" size="lg" block id="btn">
                    Create a New Listing
                    </Button>
                </div>
                </CardBody>
                </Card>
            </Container>
        </section>
    );
};

export default Jumbo;