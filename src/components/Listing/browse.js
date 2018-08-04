import React, { Component } from "react";
import PageSelect from "../PageSelect";
// import React, { Component } from 'react';
// import PageSelect from '../Header/PageSelect';
import { Link } from "react-router-dom";
import "../../App.js";
import ReactDOM from "react-dom";
//import Input from '../Form/Input';
import './style.css'
import {
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Nav,
  NavItem
} from "reactstrap";
import { List, ListItem } from "../List";
import { Col, Row, Container } from "../Grid";
import API from "../utils/API";
import "./style.css";
import UserProfiles from "../pages/userprofiles";
class Browse extends Component {
	constructor(props) {
		super(props);
	
  this.state = {
    listings: [],
    title: "",
    description: "",
    duration: "",
    datesAvailable: "",
    tags: "",
    searchQuery: "",
	searchResults: [],
	text: "",
	receiver: "",
	user: ""
  };
	}
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
		}),
		this.forceUpdate()

      )
      .catch(err => console.log(err));
  };
  splitString = stringToSplit => {
    for (var i = 0; i < stringToSplit.length; i++) {
      stringToSplit = stringToSplit.replace(" ", ",");
    }
    var arrayOfStrings = stringToSplit.split(",");
    return arrayOfStrings;
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.body);
    console.log(this.state.receiver);
  };
  handleSearch = event => {
    event.preventDefault();
    var searchTags = this.splitString(this.state.searchQuery);
    console.log(searchTags);
    var searchInfo = {
      searchTags: searchTags
	};
	
    API.findByTags(searchInfo).then(res => {
      // console.log(res.data)
      this.setState({
        searchResults: res.data
      });

      console.log(this.state.searchResults);
      if (this.state.searchResults.length > 0) {
        var results = this.state.searchResults.map(listing => (
          <div class="listClass">
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
        ));
        // this.state.listings.map(listing => {
        // ReactDOM.unmountComponentAtNode("allListingsDiv")
        // })
        ReactDOM.render(results, document.getElementById("allListingsDiv"));
        this.forceUpdate();
      } else {
        ReactDOM.render(
          "No Results to Display",
          document.getElementById("allListingsDiv")
        );
      }
    });
  };
  handleFormSubmit = event => {
	event.preventDefault();
	console.log(this.state.receiver)
	if (this.state.text !== "") {
		API.sendMessage({
			receiver: this.state.receiver,
			body: this.state.text,
			sender: this.props.username,
			chips: 0
		  }).then(res => console.log(res))
	}
  }
  seeUserInfo = (event, username) => {
    event.preventDefault();
    console.log(username);
  };
  checkListing = id => {
    API.checkListing(id)
      .then(res => {
		  console.log(res.data.owner)
		this.setState({receiver: res.data.owner}, function() {
        console.log(this.state.receiver);
        var results = (
          <div class="listClass">
            <ListItem key={res.data._id}>
              <strong>
                <ul>
                  <h1> Lister: {res.data.owner}</h1>
                  <h1> {res.data.title} </h1>
                  <h2> {res.data.description} </h2>
                  <h2> Duration: {res.data.duration} </h2>
                  <li> Dates Available: {res.data.datesAvailable} </li>
                  <h3> Send a Message</h3>
                  <FormGroup row>
                    <Label for="exampleText" sm={2}>
                      Text Area
                    </Label>
					  <Input type="textarea" name="text" id="text" onChange={this.handleInputChange}/>
                  </FormGroup>
				  <Button onClick={this.handleFormSubmit}>Send</Button>
                </ul>
              </strong>
            </ListItem>
          </div>
        );
        console.log("line 132");
        console.log(results);
        ReactDOM.render(results, document.getElementById("allListingsDiv"));
        // this.forceUpdate();
	  })
	})
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
          <button onClick={this.handleSearch}>Submit</button>
        </Form>
        <PageSelect />
        <div id="noResults" />
        <div id="listingsDiv" />
        <div id="allListingsDiv">
          <Row>
            <Col size="md-6 sm-12">
              {this.state.listings.length ? (
                <List>
                  {this.state.listings.map(listing => (
                    <div class="listClass" id={listing._id}>
                      <ListItem key={listing._id}>
                        <strong>
                          <ul>
                            <h1> {listing.title} </h1>
                            <h2> {listing.description} </h2>
                            <h2> {listing.duration} </h2>
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
