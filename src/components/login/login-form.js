import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home/home.js';
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardHeader, CardBody, Container } from 'reactstrap';
import './style.css';

class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			redirectTo: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	// redirectPage(user)  {
	//      this.setState(() => ({
	//         redirectTo: true
	//     }))
	//     console.log(this.state.redirectTo);
	// }

	// another() {
	// 	this.setState({
	// 		redirectTo: true
	// 	});
    // }
    
    componentDidMount() {
        
    }

	handleSubmit(event) {
		event.preventDefault();
		console.log('handleSubmit');

		axios
			.post('/user/login', {
				username: this.state.username,
				password: this.state.password
			})
			.then((response) => {
				console.log('login response: ');
				console.log(response);
				if (response.status === 200) {
					// update App.js state
					this.setState({
						redirectTo: true
					});
					console.log(this.state.redirectTo);
					this.props.updateUser({
						loggedIn: true,
						username: response.data.username,
						id: response.data.id
					});
					// update the state to redirect to home

					// console.log(this.state.redirectTo);
				
				}

				// console.log(this.state.redirectTo);
			})
			.catch((error) => {
				console.log(this.state);
				console.log('login error: ');
				console.log(error);
			});
		
	}

	render() {
		if (this.state.redirectTo === true) {
		    console.log()
		    return (<Redirect to='/'/>)
		} else {
		return (
			<Container id="login">
				<Card className="text-center">
					<CardHeader>
						<h4>Login</h4>
					</CardHeader>
					<CardBody>
						<Form>
							<FormGroup>
								<Label for="username">UserName :</Label>
								<Input
									type="text"
									id="username"
									name="username"
									placeholder="Username"
									value={this.state.username}
									onChange={this.handleChange}
									className="text-center"
								/>
							</FormGroup>
							<FormGroup>
								<Label for="password">Password :</Label>
								<Input
									placeholder="password"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									className="text-center"
								/>
							</FormGroup>
							<FormGroup>
								<Button color="primary" onClick={this.handleSubmit} type="submit">
									Login
								</Button>
							</FormGroup>
						</Form>
					</CardBody>
					{/* <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="username">Username</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div> */}
					{/* <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="password">Password: </label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div> */}
					{/* <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                className="btn btn-primary col-1 col-mr-auto"
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
                        </div>
                    </form> */}
				</Card>
			</Container>
		);
		}
	}
}

export default LoginForm;
