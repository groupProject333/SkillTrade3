import React from 'react';
import "./logo.css";
import {Container,Card, CardImg} from 'reactstrap';

const Logo = (props) => {
    return (
        <Container id="logo">
        <Card>
            <CardImg src={require('../Images/skilllogo1.png')} id="img" responsive/>
            </Card>
        </Container>
    );
};

export default Logo;