import React, { Component } from 'react';
import API from '../utils/API';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import { MessageListItem } from './index';
import {  CardBody, Card } from 'reactstrap';

import './singleMessage.css';

class SingleMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messageProps: []
		};
	}
	arr = [];
	state = {
		messages: [],
		messageBody: [],
		receiver: '',
		body: ''
	};
	componentDidMount() {
		
		console.log(this.props.username + ' username is');
	
	}
	

	handleFormSubmit = (event) => {
		event.preventDefault();
		console.log(this.props.username + 'LINE 109!!!!!!!!!!!!!!!!!!');
		if (this.state.receiver && this.state.body) {
			API.sendMessage({
				receiver: this.state.receiver,
				body: this.state.body,
				sender: this.props.username
			}).catch((err) => console.log(err));
			console.log('here 133');
			if (this.state.receiver === this.props.username) {
				console.log('135 Receiver is the same');
			} else {
				console.log('135 Receiver isnt same');
			}
		}
	};

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div>
				<Card id="mess" className="text-center singleMessCard" body outline color="danger">
					<CardBody>
						<h1>Send Message</h1>
						<Form>
							<FormGroup>
								<Label for="exampleText">Message</Label>
								<Input
									type="textarea"
									name="body"
									id="exampleText"
									onChange={this.handleInputChange}
									value={this.state.body}
									bsSize="lg"
								/>
							</FormGroup>
							<FormGroup>
								<Label for="exampleEmail">User</Label>
								<Input
									type="textarea"
									name="receiver"
									id="exampleEmail"
									onChange={this.handleInputChange}
									value={this.state.receiver}
									bsSize="lg"
								/>
							</FormGroup>
							<Button
								disabled={!(this.state.receiver && this.state.body)}
								onClick={this.handleFormSubmit}
								color="primary"
								size="lg"
								block
								style={{ margin: 'auto' }}
							>
								Send Message
							</Button>
						</Form>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default SingleMessage;