import React, { Component } from "react";
import PageSelect from "../PageSelect";
// import React, { Component } from 'react';
// import PageSelect from '../Header/PageSelect';
import { Link, Router } from "react-router-dom";
import "../../App.js";
import ReactDOM from "react-dom"
//import Input from '../Form/Input';
import { FormGroup, Label, Input, Form, Button } from "reactstrap"
import { List, ListItem } from "../List";
import { Col, Row, Container } from "../Grid";
import API from "../utils/API";
import "./style.css";

class Browse extends Component {
  state = {
    listings: [],
    title: "",
    description: "",
    duration: "",
    datesAvailable: "",
	tags: "",
	searchQuery: "",
	searchResults: [],
  };

  componentDidMount() {
    this.loadListings();
  }

  loadListings = () => {
    API.getListings()
      .then(res =>
        this.setState({
          listings: res.data,
          title: "",
          description: "",
          duration: "",
          datesAvailable: "",
          tags: ""
        })
      )
      .catch(err => console.log(err));
  };
  splitString = (stringToSplit) => {
    for(var i = 0; i < stringToSplit.length; i++) {
 
        stringToSplit = stringToSplit.replace(" ", ",");
        
       }
       var arrayOfStrings = stringToSplit.split(",");
       return arrayOfStrings
}
  handleSearch = (event) => {
	event.preventDefault()
	var searchTags = this.splitString(this.state.searchQuery)
	console.log(searchTags)
	var searchInfo = {
		searchTags: searchTags
	}
	API.findByTags(searchInfo)
	.then(res => {
		// console.log(res.data)
		this.setState({
			searchResults: res.data
		})

		console.log(this.state.searchResults)
		if(this.state.searchResults.length > 0) {
		var results = this.state.searchResults.map(listing => (
			<div>
			<ListItem key={listing._id}>
			{/* <Router>
			<Link to={"/listing/" + listing._id}/>
			</Router> */}
			  <strong>
				<ul>
				  <li> {listing.title} </li>
				  <li> {listing.description} </li>
				  <li> {listing.duration} </li>
				  <li> {listing.datesAvailable} </li>
				  {/* <li> {listing.tags} </li> */}
				</ul>
			  </strong>
			<button
			  className="checklistBtn"
			  onClick={() => this.checkListing(listing._id)}
			>
			  check
			</button>
		  </ListItem>
		  </div>
		))
		// this.state.listings.map(listing => {
			// ReactDOM.unmountComponentAtNode("allListingsDiv")
		// })
		ReactDOM.render(results, document.getElementById("allListingsDiv"));
		this.forceUpdate();
	}
	else {
		ReactDOM.render("No Results to Display", document.getElementById("allListingsDiv"));
	}
	})
  }
  checkListing = id => {
    API.checkListing(id)
      .then(res => console.log("success"))
      .catch(err => console.log("err from checkListing", err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container is="autoM">
	  <Form>
        <FormGroup>
          <Label>Search</Label>
          <input
		  	
			name="searchQuery"
			onChange={this.handleInputChange}
            placeholder="guitar"
          />
		</FormGroup>{" "}
		<button 
			onClick={this.handleSearch}>Submit</button>
		</Form>
        <PageSelect />
		<div id="noResults"></div>
		<div id="listingsDiv"></div>
		<div id="allListingsDiv">
        <Row>
          <Col size="md-6 sm-12">
            {this.state.listings.length ? (
              <List>
                {this.state.listings.map(listing => (
					<div id ={listing._id}>
                  <ListItem key={listing._id}>
                    <Link to={"/listing/" + listing._id}>
                      <strong>
                        <ul>
                          <li> {listing.title} </li>
                          <li> {listing.description} </li>
                          <li> {listing.duration} </li>
                          <li> {listing.datesAvailable} </li>
                          <li> {listing.tags} </li>
                        </ul>
                      </strong>
                    </Link>
                    <button
                      className="checklistBtn"
                      onClick={() => this.checkListing(listing._id)}
                    >
                      check
                    </button>
                  </ListItem>
				  </div>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
		</div>
      </Container>
    );
  }
}

export default Browse;
