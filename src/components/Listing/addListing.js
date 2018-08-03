import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from '../Form';
import {Container, Form} from 'reactstrap'
import API from '../utils/API';
import './style.css'
import './../../App.js'
class Listing extends Component {
	constructor(props) {
		super(props);
		this.state = {
		title: '',
		description: '',
		duration: '',
		datesAvailable: '',
		tags: ''
		};
	}

handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
		[name]: value
    });
};
// splitString(tempestString);
// console.log(tempestString)
splitString = (stringToSplit) => {
    for(var i = 0; i < stringToSplit.length; i++) {
 
        stringToSplit = stringToSplit.replace(" ", ",");
        
       }
       var arrayOfStrings = stringToSplit.split(",");
       return arrayOfStrings
}
	handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.username + "LINE 25");
    console.log("state in handle submit", this.state.title)
		if (
			this.state.title &&
			this.state.description &&
			this.state.duration &&
			this.state.datesAvailable &&
			this.state.tags 
		) {
			var tags = this.splitString(this.state.tags)
			API.saveListing({ 
				title: this.state.title,
				description: this.state.description,
				duration: this.state.duration,
				datesAvailable: this.state.datesAvailable,
				hashtags: tags,
				owner: this.props.username
			}) 
				.then(res => console.log(res))
				.catch((err) => console.log("err from saveListing", err));
		}
	};

	render() {
		return (
			<Container id="autoM">
				<Form className="list-container">
					<Input
						className="listing-text"
					//	value={this.state.title}
						onChange={this.handleInputChange}
						name="title"
						placeholder="Title"
					/>
					<Input
						className="listing-text"
						//value={this.state.datesAvailable}
						onChange={this.handleInputChange}
						name="datesAvailable"
						placeholder="Dates Available"
					/>
					<TextArea
						className="listing-text desc-box"
						//value={this.state.description}
						onChange={this.handleInputChange}
						name="description"
						placeholder="Description"
					/>
					<Input
						className="listing-text"
						//value={this.state.duration}
						onChange={this.handleInputChange}
						name="duration"
						placeholder="Duration"
					/>
					<Input
						className="listing-text"
						//value={this.state.tags}
						onChange={this.handleInputChange}
						name="tags"
						placeholder="Tags"
					/>
					<FormBtn
						 /* disabled={
							!(
								this.state.title &&
								this.state.description &&
								this.state.duration &&
								this.state.datesAvailable &&
								this.state.tags
							)
						}  */
						onClick={this.handleFormSubmit}
					>
						Submit Listing
					</FormBtn>
				</Form>
			</Container>
		);
	}
}

export default Listing;
