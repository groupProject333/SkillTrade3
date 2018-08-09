import React, { Component } from "react";
import PageSelect from "../PageSelect";
// import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route } from "react-router-dom";
import "../../App.js";
import ReactDOM from "react-dom";
//import Input from '../Form/Input';
import "./style.css";
import {
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
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
      user: "",
      profileToView: [],
      modal: false,
      reviews: []
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.loadListings();
  }
  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  loadListings = () => {
    API.getListings()
      .then(
        res =>
          this.setState({
            listings: res.data,
            title: "",
            description: "",
            duration: "",
            datesAvailable: "",
            tags: ""
          })
        // this.renderListings()
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
  viewProfile = username => {
    API.getNewProfile(username).then(res => {
      console.log(res);
      this.setState({ profileToView: res.data });
      console.log(this.state.profileToView);
      console.log(this.state.profileToView.review.length)
      if(this.state.profileToView.review.length > 0) {
      API.getReviewBody(this.state.profileToView._id).then(res => {
        console.log(res);
        this.setState({ reviews: res.data });
        console.log(this.state.reviews);
        this.renderReviews();
      });
    }
    });

  
  };
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.receiver);
    if (this.state.text !== "") {
      API.sendMessage({
        receiver: this.state.receiver,
        body: this.state.text,
        sender: this.props.username,
        chips: 0
      }).then(res => console.log(res));
    }
  };
  seeUserInfo = (event, username) => {
    event.preventDefault();
    console.log(username);
  };
  checkListing = id => {
    API.checkListing(id)
      .then(res => {
        console.log(res.data.owner);
        this.setState({ receiver: res.data.owner }, function() {
          console.log(this.state.receiver);
          var results = (
            <div className="listClass">
              <ListItem key={res.data._id}>
                <strong>
                  <ul>
                    <h1> Lister: {res.data.owner}</h1>
                    <Button
                      type="submit"
                      onClick={() => {
                        this.viewProfile(res.data.owner);
                      }}
                    >
                      See Reviews
                    </Button>
                    <h1> {res.data.title} </h1>
                    <h2> {res.data.description} </h2>
                    <h2> Duration: {res.data.duration} </h2>
                    <li> Dates Available: {res.data.datesAvailable} </li>
                    <h3> Send a Message</h3>
                    <FormGroup row>
                      <Label for="exampleText" sm={2}>
                        Text Area
                      </Label>
                      <Input
                        type="textarea"
                        name="text"
                        id="text"
                        onChange={this.handleInputChange}
                      />
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
          window.scrollTo(0, 0)
          this.forceUpdate();
        });
      })
      .catch(err => console.log("err from checkListing", err));
  };
  renderReviews = () => {
    if (this.state.reviews.length > 0) {
    console.log(this.state.reviews[0].message);
    this.toggle();
    }
    else {
      alert("no reviews")
    }
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div id="body">
        <div>
          {/* <Button color="danger" onClick={this.toggle}>
            {this.props.buttonLabel}
          </Button> */}
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>
              <strong>{this.state.profileToView.username}</strong>
            </ModalHeader>
            <ModalBody id="myModal">
              <List>
                {this.state.reviews.map(res => (
                  <div className="listClass" id={res._id}>
                    <ListItem key={res._id}>
                      <strong>
                        <ul>
                          <h1> {res.reviewer}</h1>
                          <h1> {res.message} </h1>
                          <h2> ⭐{res.rating} </h2>
                        </ul>
                      </strong>
                    </ListItem>
                  </div>
                ))}
              </List>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>
                Close
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </div>
        <Container is="autoM">
          <Form>
            <FormGroup>
              <Label id="search">Search Listings</Label>
              < br/>
              <input
                id="searchBar"
                name="searchQuery"
                onChange={this.handleInputChange}
                placeholder="guitar"
              />
            </FormGroup>{" "}
            <button onClick={this.handleSearch}>Search</button>
          </Form>
          <PageSelect />
          <div id="noResults"> </div>
          <div id="listingsDiv"> </div>
          <div id="allListingsDiv"> </div>
          <Row>
            <Col size="md-12 sm-12">
              {this.state.listings.length ? (
                <List>
                  {this.state.listings.map(listing => (
                    <div className="listClass" id={listing._id}>
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
                          View
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
        </Container>
      </div>
    );
  }
}

export default Browse;
