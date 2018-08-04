import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardBody } from 'reactstrap';
//import SingleMessage from '../singleMessage/singleMessage.js';
import './singleListing.css';

import API from '../utils/API';

class singleListing extends Component {
	state = {
		listing: {}
	};

	componentDidMount() {
		console.log('single listing hit');
		API.checkListing(this.props.match.params.id)
			.then((res) => this.setState({ listing: res.data }))
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div>
				<div>
					<Container>
						<Card>
							<CardBody>
								<h1>{this.state.listing.title} from user ID</h1>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<h1></h1>
								<p>{this.state.listing.description}</p>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<h3>Duration</h3>
								<p>{this.state.listing.duration}</p>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<h3>Dates Available</h3>
								<p>{this.state.listing.datesAvailable}</p>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<h3>Tags</h3>
								<p>{this.state.listing.tags}</p>
							</CardBody>
						</Card>
					</Container>
					<div />
				</div>
				
				<Card>
					<CardBody>
						<Link to="/browse/">← Back to Browse</Link>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default singleListing;
