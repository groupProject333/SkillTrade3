import React, { Component } from "react";
import { Link } from "react-router-dom";
// import API from '../utils/API';
import axios from 'axios';

import API from "../utils/API";

import ReactDOM from "react-dom";
// import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "./profile.css";
import { Card, Container, CardHeader, CardBody } from "reactstrap";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
// import Wrapper from '../Wrapper';
// import UserProfile from "../userprofile";
// import { CardBody, CardHeader, Container,  Form, FormGroup, Label, Input } from 'reactstrap';

class Profile extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          popoverOpen: false,
          id: this.props.id,
          profile: [],
          _id: "",
          firstName: "",
          lastName: "",
          email: "",
          imageLink: "",
          birthdate: "",
          location: "",
          skills: "",
          reviews: [],
          reviewer: "",
          rating: "",
          message: "",
          reviewPoints: [],
          average: ""
        };
      }

      getUser = username => {
        API.getUser(username).then(res => {
          console.log(res);
          this.setState({
            reviews: res.data.reviews
          });
          this.state.reviews.map(id => {
            this.getReviewBody(id);
            return id;
          });
          console.log(this.state.reviews);
        });
      };
      getReviewAverage = () => {
        var total = 0;
        for (var i = 0; i < this.state.reviewPoints.length; i++) {
          var num = parseInt(this.state.reviewPoints[i]);
          if (num !== null) {
            total = total + num;
            console.log(total);
          }
          if (i == this.state.reviewPoints.length - 1) {
            var average = total / this.state.reviewPoints.length - 1;
            this.setState({
              average: average
            });
            console.log(this.state.average);
            // this.toggle();
          }
        }
      };
      renderReview = reviewData => {
        console.log(reviewData);
        var reviewItem = (
          <div className="reviewClass" id={reviewData._id} key={reviewData._id}>
            <p>From:{reviewData.reviewer}</p>
            <p>Rating:{reviewData.rating}</p>
            <p>Message:{reviewData.message}</p>
            {this.state.reviewPoints.push(reviewData.rating)}
          </div>
        );
        this.getReviewAverage();
        ReactDOM.render(reviewItem, document.getElementById("reviewDiv"));
      };
      getReviews = id => {
        console.log(id);
        API.getReviewBody(id).then(res => {
          console.log(res.data);
          var reviewItems = res.data.map(review => (
            // console.log(review)
            <div className="reviewClass" id={review._id} key={review._id}>
              <p>From:{review.reviewer}</p>
              <p>Rating:{review.rating}</p>
              <p>Message:{review.message}</p>
              {this.state.reviewPoints.push(review.rating)}
            </div>
          ));
          this.getReviewAverage();
          ReactDOM.render(reviewItems, document.getElementById("reviewDiv"));
        });
      };

      saveReview = reviewData => {
        API.saveReview(reviewData);
        // this.state.reviews.push(reviewData)
        this.getReviews(this.state._id);
        // this.setState({ popoverOpen: true });
      };
      handleFormSubmit2 = event => {
        event.preventDefault();
        this.toggle();
        console.log(this.state._id);
        var reviewData = {
          reviewer: this.props.username,
          rating: this.state.rating,
          message: this.state.message,
          receiverId: this.state._id
        };
        this.saveReview(reviewData);
        document.getElementById("exampleText").disabled = true;
        document.getElementById("exampleSelect").disabled = true;
        document.getElementById("Popover1").disabled = true;
        // })
      };
//     state = {
//         id: this.props.id,
//         usr: this.props.username,
//         profile: [],
//         _id: "",
//         username: "",
//         firstName: "",
//         lastName: "",
//         email: "",
//         imageLink: "",
//         birthdate: "",
//         location: "",
//         skills: "",
//         karmaChips: "",
//         dateJoined: ""
//     };


    componentDidMount() {
      
        this.loadProfile();
    };
    

    getProfile(id, username){
      axios.get("/api/profiles/exist/" + id + "/" + username )
      .then(response => {
        console.log(response);
        this.setState({ profile: response.data, _id: response.data._id, username: response.data.username, firstName: response.data.firstName, lastName: response.data.lastName, email: response.data.email, imageLink: response.data.imageLink, birthdate: response.data.birthdate, location: response.data.location, skills: response.data.skills, karmaChips: response.data.karmaChips, dateJoined: response.data.dateJoined })
      })
      .catch(err => console.log(err));
    ;}


    loadProfile() {
        this.getProfile(this.state.id, this.state.usr);
    };
    
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };
toggle() {
    // event.preventDefault();
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
    // this.handleFormSubmit2();
  };
    
    handleFormSubmit = event => {
        event.preventDefault();
        
          var profileData = {
            _id: this.state._id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            imageLink: this.state.imageLink,
            birthdate: this.state.birthdate,
            location: this.state.location,
            skills: this.state.skills
          };
          console.log(profileData);
          // let req = {
          //   url: "/api/profiles/" + this.state.id,
          //   method: 'PUT',
          //   data: profileData
          // };
          axios.put("/api/profiles/" + this.state.id, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            imageLink: this.state.imageLink,
            birthdate: this.state.birthdate,
            location: this.state.location,
            skills: this.state.skills
          })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    
	render() {
		return (
			<section>
            <Container>
                    <Card body color="info" id="prof">
                        <CardHeader>
                {/* <h1>_id: {this.props.id}</h1> */}
                <h1>karma chips : {this.state.karmaChips}</h1>
                {/* <UserProfile karmaChips={this.state.karmaChips} imageLink={this.state.imageLink} firstName={this.state.firstName} lastName={this.state.lastName} skills={this.state.skills} location={this.state.location} dateJoined={this.state.dateJoined} />
                <form>
                    <div className= "form-group">
                        <label for="firstName" className="form-text"> */}
                </CardHeader>
                <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="firstName" className="form-text">
                            First Name
                        </Label>
                        <div className="">
                            <Input type="title" className="form-control text-center" id="firstName" name="firstName" placeholder={this.state.firstName} onChange={this.handleInputChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName" className="form-text">
                            Last Name
                        </Label>
                        <div className="">
                            <Input type="title" className="form-control text-center" id="lastName" name="lastName" placeholder={this.state.lastName} onChange={this.handleInputChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email" className="form-text">
                            Email?
                        </Label>
                        <div className="">
                            <Input type="title" className="form-control text-center" id="email" name="email" placeholder={this.state.email} onChange={this.handleInputChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="imageLink" className="form-text">
                            Image Link?
                        </Label>
                        <div className="">
                            <Input type="title" className="form-control text-center" id="imageLink" name="imageLink" placeholder={this.state.imageLink} onChange={this.handleInputChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="birthdate" className="form-text">
                            Birthday (mm/dd/yy)?
                        </Label>
                        <div className="">
                            <Input type="title" className="form-control text-center" id="birthdate" name="birthdate" placeholder={this.state.birthdate} onChange={this.handleInputChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="location" className="form-text">
                            Where are you located?
                        </Label>
                        <div className="">
                            <Input type="title" className="form-control text-center" id="location" name="location" placeholder={this.state.location} onChange={this.handleInputChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="skills" className="form-text">
                            Description of your Skills
                        </Label>
                        <div className="">
                            <Input type="textarea" className="form-control text-center" id="skills" name="skills" placeholder={this.state.skills} onChange={this.handleInputChange}/>
                        </div>
                    </FormGroup>
                    <button onClick={this.handleFormSubmit}>Update Profile</button>
                </Form>
                <FormGroup>
                <Card>
             <CardBody>
               <Form>
                 <FormGroup>
                   <h1>Leave a Review</h1>
                   <Label for="exampleSelect">Rating</Label>
                   <Input
                     type="select"
                     name="rating"
                     id="exampleSelect"
                     onChange={this.handleInputChange}
                     value={this.state.rating}
                     // onClick={console.log(this.state.rating)}
                   >
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                   </Input>
                 </FormGroup>
                 <FormGroup>
                   <Label for="exampleText">Review</Label>
                   <Input
                     type="textarea"
                     name="message"
                     id="exampleText"
                     onChange={this.handleInputChange}
                     value={this.state.message}
                   />
                 </FormGroup>
                 <Button
                   id="Popover1"
                   disabled={!this.state.message || !this.state.rating}
                   style={{ margin: "auto" }}
                   onClick={this.handleFormSubmit2}
                   toggle={this.toggle}
                 >
                   Post
                 </Button>
               </Form>
               <div id="reviewDiv" />
               <Link to={`/messaging/${this.props.username}`}>Messaging</Link>
               {/* {this.state.loggedIn && <Route path="/browse" component={Browse} />} */}
               {/* {console.log("/messaging/" + this.props.username)} */}
               <Link to={`/messaging/${this.props.username}`}>Messaging</Link>
               {/* </Form> */}

             </CardBody>
           </Card>
           </FormGroup>
           </CardBody>
           </Card>
           </Container>
	</section>
		);
	}
};



export default Profile;


// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import API from "../utils/API";
// import axios from "axios";
// import ReactDOM from "react-dom";
// import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
// import "./profile.css";
// import { Card, Container, CardHeader, CardBody } from "reactstrap";
// import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

// import "bootstrap/dist/css/bootstrap.min.css";

// class Profile extends Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       popoverOpen: false,
//       id: this.props.id,
//       profile: [],
//       _id: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       imageLink: "",
//       birthdate: "",
//       location: "",
//       skills: "",
//       reviews: [],
//       reviewer: "",
//       rating: "",
//       message: "",
//       reviewPoints: [],
//       average: ""
//     };
//   }

//   toggle() {
//     // event.preventDefault();
//     this.setState({
//       popoverOpen: !this.state.popoverOpen
//     });
//     // this.handleFormSubmit2();
//   }

//   componentDidMount() {
//     this.loadProfile();
//   }

//   getUser = username => {
//     API.getUser(username).then(res => {
//       console.log(res);
//       this.setState({
//         reviews: res.data.reviews
//       });
//       this.state.reviews.map(id => {
//         this.getReviewBody(id);
//         return id;
//       });
//       console.log(this.state.reviews);
//     });
//   };
//   getReviewAverage = () => {
//     var total = 0;
//     for (var i = 0; i < this.state.reviewPoints.length; i++) {
//       var num = parseInt(this.state.reviewPoints[i]);
//       if (num !== null) {
//         total = total + num;
//         console.log(total);
//       }
//       if (i == this.state.reviewPoints.length - 1) {
//         var average = total / this.state.reviewPoints.length - 1;
//         this.setState({
//           average: average
//         });
//         console.log(this.state.average);
//         // this.toggle();
//       }
//     }
//   };
//   renderReview = reviewData => {
//     console.log(reviewData);
//     var reviewItem = (
//       <div className="reviewClass" id={reviewData._id} key={reviewData._id}>
//         <p>From:{reviewData.reviewer}</p>
//         <p>Rating:{reviewData.rating}</p>
//         <p>Message:{reviewData.message}</p>
//         {this.state.reviewPoints.push(reviewData.rating)}
//       </div>
//     );
//     this.getReviewAverage();
//     ReactDOM.render(reviewItem, document.getElementById("reviewDiv"));
//   };
//   getReviews = id => {
//     console.log(id);
//     API.getReviewBody(id).then(res => {
//       console.log(res.data);
//       var reviewItems = res.data.map(review => (
//         // console.log(review)
//         <div className="reviewClass" id={review._id} key={review._id}>
//           <p>From:{review.reviewer}</p>
//           <p>Rating:{review.rating}</p>
//           <p>Message:{review.message}</p>
//           {this.state.reviewPoints.push(review.rating)}
//         </div>
//       ));
//       this.getReviewAverage();
//       ReactDOM.render(reviewItems, document.getElementById("reviewDiv"));
//     });
//   };
//   getProfile = id => {
//     axios
//       .get("/api/profiles/exist/" + id)
//       .then(response => {
//         console.log(response);

//         this.setState({
//           profile: response.data,
//           _id: response.data._id,
//           username: response.data.username,
//           firstName: response.data.firstName,
//           lastName: response.data.lastName,
//           email: response.data.email,
//           imageLink: response.data.imageLink,
//           birthdate: response.data.birthdate,
//           location: response.data.location,
//           skills: response.data.skills,
//           karmaChips: response.data.karmaChips,
//           dateJoined: response.data.dateJoined
//         });
//       })
//       .catch(err => console.log(err));
//   };
//   loadProfile() {
//     this.getProfile(this.state.id, this.state.usr);
//   }

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   loadProfile() {
//     this.getProfile(this.state.id);
//   }

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };
//   saveReview = reviewData => {
//     API.saveReview(reviewData);
//     // this.state.reviews.push(reviewData)
//     this.getReviews(this.state._id);
//     this.setState({ popoverOpen: true });
//   };
//   handleFormSubmit2 = event => {
//     event.preventDefault();
//     this.toggle();
//     console.log(this.state._id);
//     var reviewData = {
//       reviewer: this.props.username,
//       rating: this.state.rating,
//       message: this.state.message,
//       receiverId: this.state._id
//     };
//     this.saveReview(reviewData);
//     document.getElementById("exampleText").disabled = true;
//     document.getElementById("exampleSelect").disabled = true;
//     document.getElementById("Popover1").disabled = true;
//     // })
//   };
//   handleFormSubmit = event => {
//     event.preventDefault();

//     var profileData = {
//       _id: this.state._id,
//       firstName: this.state.firstName,
//       lastName: this.state.lastName,
//       email: this.state.email,
//       imageLink: this.state.imageLink,
//       birthdate: this.state.birthdate,
//       location: this.state.location,
//       skills: this.state.skills
//     };
//     console.log(profileData);
//     let req = {
//       url: "/api/profiles/" + this.state.id,
//       method: "PUT",
//       data: profileData
//     };

//     axios
//       .put("/api/profiles/" + this.state.id, {
//         firstName: this.state.firstName,
//         lastName: this.state.lastName,
//         email: this.state.email,
//         imageLink: this.state.imageLink,
//         birthdate: this.state.birthdate,
//         location: this.state.location,
//         skills: this.state.skills
//       })
//       .then(res => console.log(res))
//       .catch(err => console.log(err));
//   };

//   render() {
//     return (
//       <section>
//         <Container>
//           <Card body border color="danger">
//             <CardHeader>
//               <h1>{`★${this.state.average}`}</h1>
//               <h1>_id: {this.props.id}</h1>
//             </CardHeader>
//             <CardBody>
//               <Form>
//                 <FormGroup>
//                   <Label for="firstName" className="form-text">
//                     First Name
//                   </Label>
//                   <div className="">
//                     <Input
//                       type="title"
//                       className="form-control text-center"
//                       id="firstName"
//                       name="firstName"
//                       placeholder={this.state.firstName}
//                       onChange={this.handleInputChange}
//                     />
//                   </div>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="lastName" className="form-text">
//                     Last Name
//                   </Label>
//                   <div className="">
//                     <Input
//                       type="title"
//                       className="form-control text-center"
//                       id="lastName"
//                       name="lastName"
//                       placeholder={this.state.lastName}
//                       onChange={this.handleInputChange}
//                     />
//                   </div>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="email" className="form-text">
//                     Email?
//                   </Label>
//                   <div className="">
//                     <Input
//                       type="title"
//                       className="form-control text-center"
//                       id="email"
//                       name="email"
//                       placeholder={this.state.email}
//                       onChange={this.handleInputChange}
//                     />
//                   </div>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="imageLink" className="form-text">
//                     Image Link?
//                   </Label>
//                   <div className="">
//                     <Input
//                       type="title"
//                       className="form-control text-center"
//                       id="imageLink"
//                       name="imageLink"
//                       placeholder={this.state.imageLink}
//                       onChange={this.handleInputChange}
//                     />
//                   </div>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="birthdate" className="form-text">
//                     Birthday (mm/dd/yy)?
//                   </Label>
//                   <div className="">
//                     <Input
//                       type="title"
//                       className="form-control text-center"
//                       id="birthdate"
//                       name="birthdate"
//                       placeholder={this.state.birthdate}
//                       onChange={this.handleInputChange}
//                     />
//                   </div>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="location" className="form-text">
//                     Where are you located?
//                   </Label>
//                   <div className="">
//                     <Input
//                       type="title"
//                       className="form-control text-center"
//                       id="location"
//                       name="location"
//                       placeholder={this.state.location}
//                       onChange={this.handleInputChange}
//                     />
//                   </div>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="skills" className="form-text">
//                     Description of your Skills
//                   </Label>
//                   <div className="">
//                     <Input
//                       type="textarea"
//                       className="form-control text-center"
//                       id="skills"
//                       name="skills"
//                       placeholder={this.state.skills}
//                       onChange={this.handleInputChange}
//                     />
//                   </div>
//                 </FormGroup>
//                 <Button onClick={this.handleFormSubmit}>Update Profile</Button>
//               </Form>
//               <div>
//                 <Popover
//                   placement="bottom"
//                   isOpen={this.state.popoverOpen}
//                   target="Popover1"
//                   toggle={this.toggle}
//                 >
//                   <PopoverHeader>Thanks For The Review</PopoverHeader>
//                   <PopoverBody id="myPopover">
//                     You've earned a KarmaChip! (˚◒˚)
                    
//                             </PopoverBody>
//                 </Popover>
//               </div>
//             </CardBody>
//           </Card>

//           <Container>
//             {/* <div id="modal">
//         <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
//         <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
//           <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
//           <ModalBody>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
//             <Button color="secondary" onClick={this.toggle}>Cancel</Button>
//           </ModalFooter>
//         </Modal>
//       </div> */}
//             <Card>
//               <CardBody>
//                 <Form>
//                   <FormGroup>
//                     <h1>Leave a Review</h1>
//                     <Label for="exampleSelect">Rating</Label>
//                     <Input
//                       type="select"
//                       name="rating"
//                       id="exampleSelect"
//                       onChange={this.handleInputChange}
//                       value={this.state.rating}
//                       // onClick={console.log(this.state.rating)}
//                     >
//                       <option>1</option>
//                       <option>2</option>
//                       <option>3</option>
//                       <option>4</option>
//                       <option>5</option>
//                     </Input>
//                   </FormGroup>
//                   <FormGroup>
//                     <Label for="exampleText">Review</Label>
//                     <Input
//                       type="textarea"
//                       name="message"
//                       id="exampleText"
//                       onChange={this.handleInputChange}
//                       value={this.state.message}
//                     />
//                   </FormGroup>
//                   <Button
//                     id="Popover1"
//                     disabled={!this.state.message || !this.state.rating}
//                     style={{ margin: "auto" }}
//                     onClick={this.handleFormSubmit2}
//                     toggle={this.toggle}
//                   >
//                     Post
//                   </Button>
//                 </Form>
//                 <div id="reviewDiv" />
//                 <Link to={`/messaging/${this.props.username}`}>Messaging</Link>
//                 {/* {this.state.loggedIn && <Route path="/browse" component={Browse} />} */}
//                 {/* {console.log("/messaging/" + this.props.username)} */}
//                 <Link to={`/messaging/${this.props.username}`}>Messaging</Link>
//               </CardBody>
//             </Card>
//           </Container>
//         </Container>
//       </section>
//     );
//   }
// }

// export default Profile;
// {
//   /* <FormGroup>
//                 <Link to={`/messaging/${this.props.username}`}>
//                     Messages
//                 </Link>
//                 </FormGroup>
//                 <FormGroup>
                      
//                       <Label for="exampleSelect">Rating</Label>
//                       <Input
//                         type="select"
//                         name="rating"
//                         id="exampleSelect"
//                         onChange={this.handleInputChange}
//                         value={this.state.rating}
//                         // onClick={console.log(this.state.rating)}
//                       >
//                         <option>1</option>
//                         <option>2</option>
//                         <option>3</option>
//                         <option>4</option>
//                         <option>5</option>
//                       </Input>
//                       </FormGroup>
//                   <Popover
//                     id="Popover1"
//                     placement="bottom"
//                     isOpen={this.state.popoverOpen}
//                     target="Popover1"
//                     toggle={this.toggle}
//                   >
//                     <PopoverHeader>Thanks For The Review</PopoverHeader>
//                     <PopoverBody id="myPopover" placement="bottom">
//                       You've earned a KarmaChip!
//                                  (˚◒˚)
//                                  <br/>
//                       <Button onClick={this.toggle}>Close</Button>
//                     </PopoverBody>
//                   </Popover> 
//                   </CardBody>
//                   </Card>
//                   </Container>
//                   </section>
//         )
//         }
//       };
// export default Profile; */
// }