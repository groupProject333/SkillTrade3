import React from 'react';
import { Jumbotron, Button, Row, Col, Form, FormGroup, Label, Input, FormText, Card, Container, CardHeader, CardBody} from 'reactstrap';
import "./search.css";

const Search = (props) => {
    return (
        <Container id="search">
            <Card id="contain">
            <CardHeader>
                    <h2 className="text-center text-primary">
                        Welcome to Skill-Trade!
                    </h2>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <FormGroup>
                            {/* <Label for="search" id="label">Search</Label> */}
                            <Input type="text" name="search" id="field" placeholder="Search Listings" large className = "text-center"/>
                        </FormGroup>
                        <Button id="btn">Submit</Button>
                        </Form>
                        </CardBody>
                </Card>
        </Container>
    );
};

export default Search;