import React, { Component } from "react";

// import API from '../utils/API';
import axios from 'axios';

import UserProfile from "../userprofile";

class UserProfiles extends Component {

  
    
    state = {
        usr: this.props.username,
        profile: [],
        _id: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        imageLink: "",
        birthdate: "",
        location: "",
        skills: "",
        karmaChips: "",
        dateJoined: "",
        listings: []
    };

    // getID() {
    //   const userID = props =>  (
    //     props.id
    //   )
    //   setState({
    //     _id: userID
    //   });
    // };

    componentDidMount() {
      // this.getID();
        this.loadProfile();
    };
    

    getuserProfile(username){
      axios.get("/api/profiles/username/" + username )
      .then(response => {
        console.log(response);
        this.setState({ profile: response.data, _id: response.data._id, username: response.data.username, firstName: response.data.firstName, lastName: response.data.lastName, email: response.data.email, imageLink: response.data.imageLink, birthdate: response.data.birthdate, location: response.data.location, skills: response.data.skills, karmaChips: response.data.karmaChips, dateJoined: response.data.dateJoined, listings: response.data.listings })
      })
      .catch(err => console.log(err));
    ;}


    loadProfile() {
        this.getuserProfile(this.state.usr);
    };
    
    
   
    
	render() {
		return (
			<section>
                
                <UserProfile karmaChips={this.state.karmaChips} imageLink={this.state.imageLink} firstName={this.state.firstName} lastName={this.state.lastName} skills={this.state.skills} location={this.state.location} dateJoined={this.state.dateJoined} />
            
			</section>
		);
	}
};



export default UserProfiles;
