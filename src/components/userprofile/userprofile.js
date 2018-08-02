import React from 'react';
import "./userprofile.css";
import { Progress, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardHeader, Container } from 'reactstrap';
const UserProfile = (props) => {
    return (
        <Container>
            <Card>
            <CardHeader>
                    <CardTitle>{props.firstName} {props.lastName}</CardTitle>
                    <CardSubtitle>{props.location}</CardSubtitle>
                </CardHeader>
                <CardImg top width="100%" src={props.imageLink} alt="Card image cap" responsice />
                <CardBody>
                    <CardText>
                        Skills: {props.skills}
                    </CardText>
                    <CardText>
                        Member since: {props.dateJoined}
                    </CardText>
                    Karma Chips Collected:
                    <Progress color="failure" value={props.karmaChips}>{props.karmaChips}</Progress>
                </CardBody>
            </Card>
        
        </Container>
    );
};
export default UserProfile;