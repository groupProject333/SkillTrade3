import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from '../Form';
import API from '../utils/API';

class Listing extends Component {
	state = {
		title: '',
		description: '',
		duration: '',
		datesAvailable: '',
		tags: ''
};

handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
		[name]: value
    });
};

	handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('hit');
    console.log("state in handle submit", this.state.title)
		if (
			this.state.title &&
			this.state.description &&
			this.state.duration &&
			this.state.datesAvailable &&
			this.state.tags 
		) {
			API.saveListing({ 
				title: this.state.title,
				description: this.state.description,
				duration: this.state.duration,
				datesAvailable: this.state.datesAvailable,
				tags: this.state.tags
			}) 
				.then(res => console.log('success'))
				.catch((err) => console.log("err from saveListing", err));
		}
	};

	render() {
		return (
			<div>
				<form className="list-container">
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
				</form>
			</div>
		);
	}
}

export default Listing;
