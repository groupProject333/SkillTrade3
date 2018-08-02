import React, { Component } from "react";

// import API from '../utils/API';
import axios from 'axios';

import UserProfile from "../userprofile";

class browseProfiles extends Component {

  
    
    state = { 
        profiles: []
    };


    componentDidMount() {
        this.loadProfiles();
    };
    

    loadProfiles() {
        axios.get("api/profiles/all")
        .then(response =>{
            console.log(response);
            this.setState({ profiles: response.data })
        })
        .catch(err => console.log(err));
    };
    
    
	render() {
		return (
			<section>
                
                {/* <UserProfile karmaChips={this.state.profiles[1].karmaChips} imageLink={this.state.profiles[1].imageLink} firstName={this.state.profiles[1].firstName} lastName={this.state.profiles[1].lastName} skills={this.state.profiles[1].skills} location={this.state.profiles[1].location} dateJoined={this.state.profiles[1].dateJoined} /> */}
            
			</section>
		);
	}
};



export default browseProfiles;
