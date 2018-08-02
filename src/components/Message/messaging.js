import React, { Component } from "react";
import API from "../utils/API";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { MessageListItem, MessageList } from "./index";
import ReactDOM from "react-dom";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { UncontrolledCollapse, Collapse, CardBody, Card } from "reactstrap";
// import "./../../App.css";
import DeleteButton from "./DeleteBtn";
import "./message.css";

class Messaging extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      messageProps: [],
      collapse: false,
      messages: [],
      messageBody: [],
      receiver: "",
      body: "",
      chipsToSend: "0",
      chips: "0"
    };
  }

  arr = [];

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  componentDidMount() {
    // console.log(this.props.id)
    this.getUser(this.props.username);
  }
  getUser = username => {
    API.getUser(username).then(res => {
      console.log(res.data.chips);
      this.setState({
        messages: res.data.message,
        chips: res.data.chips
      });
      this.state.messages.map(id => {
        this.getMessageBody(id);
        return id;
      });
      console.log(this.state.chips);
      // this.getMessageBody(this.state.messages[0])
    });
  };

  renderMessages = message => {
    var para = document.createElement("p");
    var node = document.createTextNode(message);
    para.appendChild(node);
    var element = document.getElementById("messageDiv");
    element.appendChild(para);
  };
  getMessageBody = id => {
    console.log(id);
    API.getMessageBody(id).then(res => {
      this.state.messageProps.push(res);
    });
  };
  displayMessages = event => {
    event.preventDefault();
    this.state.messageBody.map(message => {
      return (
        <MessageListItem id="center">
          <strong>
            <h1>{message.data[0].body}</h1>
          </strong>
        </MessageListItem>
      );
    });
  };

  removeMessage = id => {
    console.log(id + "LINE 84!!!!!!!!!!!!!!!!!!!!!!!!1");
    document.getElementById(id).remove();
  };
  deleteFromProps = id => {
    console.log(this.state.messageProps[0].data);
    // var mongoose = require("mongoose");
    // id = ObjectId(id).str;
    console.log(id);
    for (var i = 0; i < this.state.messageProps.length; i++) {
      console.log(
        this.state.messageProps[i].data[0]._id +
          "HEEEERRRRE))))))))))))))))))))))))))"
      );
      if (this.state.messageProps[i].data[0]._id == id) {
        console.log("118");
        this.state.messageProps.splice(i, 1);
        console.log(this.state.messageProps);
        this.provideMessagesB();
        break;
      } else {
        console.log("120");
        i++;
      }
    }
  };
  deleteMessage = (username, id) => {
    console.log(id);
    API.deleteMessage({
      username: username,
      id: id
    });
    this.deleteFromProps(id);

    // this.state.messageProps.map(message => {
    //   if (message.data[0]._id === id) {
    //     console.log(id);
    // }
    // })

    // this.state.messageProps.splice(_.indexOf(this.state.messageProps, _.findWhere(this.state.messageProps, { id : id})), 1);
  };
  updateChips = () => {
    console.log("HERE UPDATE CHIPS")
    var chips = parseInt(this.state.chipsToSend)
    var info = {
      username: this.props.username,
      chips: -(chips)
    }
    API.updateChips(info)
    .then(res => {
      console.log("128")
      console.log(res)
      this.getUser(this.props.username)
    })
  }
  handleFormSubmit = event => {
    event.preventDefault();
    var info = []
    console.log(this.props.username + "LINE 109!!!!!!!!!!!!!!!!!!");
    if (this.state.receiver && this.state.body) {
      if ((this.state.receiver === this.props.username) && (this.state.chipsToSend !== "0")) {
        alert("You can't send chips to yourself")
      }
      else {
      API.sendMessage({
        receiver: this.state.receiver,
        body: this.state.body,
        sender: this.props.username,
        chips: parseInt(this.state.chipsToSend)
      })
      .then(this.updateChips())
      .catch(err => console.log(err));
      }
    }

  };
  sayHi = event => {
    event.preventDefault();
    console.log(this.state.body);
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  provideMessagesB = () => {
    if (this.state.messageProps.length === 0) {
      this.setState({ popoverOpen: true });
      document.getElementById("messageDiv").innerHTML = "";
    } else {
      console.log(this.state.messageProps);
      let data = this.state.messageProps;
      const listItems = data.map(d => (
        // <li receiver={d.data.}
        <div class="messageClass" id={d.data[0]._id} key={d.data[0]._id}>
          <p>From: {d.data[0].sender}</p>
          <p>Body: {d.data[0].body}</p>
          <p>Chips Received: {d.data[0].chips}</p>
          <DeleteButton
            onClick={() =>
              this.deleteMessage(this.props.username, d.data[0]._id)
            }
            color="primary"
            bsSize="lg"
            block
          >
            Delete
          </DeleteButton>
          <div>
            <Button
              color="primary"
              bsSize="lg"
              block
              id="toggler"
              style={{ marginBottom: "1rem", margin: "auto" }}
            >
              Reply
            </Button>
            <UncontrolledCollapse toggler="#toggler">
              <Card body outline color="warning">
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="exampleText">Reply</Label>
                      <Input
                        type="textarea"
                        name="body"
                        id="exampleText"
                        onChange={this.handleInputChange}
                        value={this.state.body}
                        onClick={this.setState({ receiver: d.data[0].sender })}
                        bsSize="lg"
                      />
                      <Button
                        // disabled={!(this.state.body)}
                        style={{ margin: "auto" }}
                        onClick={this.handleFormSubmit}
                      >
                        Send Message
                      </Button>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>
        </div>
      ));
      console.log(listItems);
      ReactDOM.render(listItems, document.getElementById("messageDiv"));
      this.forceUpdate();
    }
    // return listItems;
  };
  provideMessages = () => {
    window.setTimeout(this.provideMessagesB, 4000);
  };
  respond = event => {
    event.preventDefault();
    console.log(this.state.messageBody);

    // alert(delButton)
  };

  checkChips = event => {
    event.preventDefault();
    if (this.state.chipsToSend > this.state.chips) {
      console.log("not enough chips");
      document.getElementById("chipChecker").textContent = "You Don't Have Enough Chips";
      this.setState({ collapse: true });

    } else if(this.state.chipsToSend < 0) {
      console.log("cant send negative chips");
      document.getElementById("chipChecker").textContent = "Can't Send Negative Chips";
      this.setState({ collapse: true });
    } else {
      console.log("you have enough chips");
      this.setState({ collapse: false });
      document.getElementById("chipAdder").textContent = "Chips Added!";
      document.getElementById("chipAdder").disabled = true;
      document.getElementById("resetButton").style.display = "inline";
    }
  };
  resetChipSend = event => {
    event.preventDefault();
    document.getElementById("chipAdder").textContent = "Add Chips To Message";
    document.getElementById("chipAdder").disabled = false;
    document.getElementById("resetButton").style.display = "none";
    this.setState({
      chipsToSend: ""
    })
  }
  render() {
    return (
      <div>
        <div>
          <Popover
            placement="bottom"
            isOpen={this.state.popoverOpen}
            target="Popover1"
            toggle={this.toggle}
          >
            <PopoverHeader>No Messages To Display</PopoverHeader>
            <PopoverBody>୧( ಠ Д ಠ )୨</PopoverBody>
          </Popover>
        </div>
        <Card id="mess" className="text-center" body outline color="danger">
          <CardBody>
            <h1>Hi, {this.props.username}!</h1>
            <h2>KarmaChips: {this.state.chips}</h2>
            {/* <h2>You have {this.state.messageBody.length} messages</h2> */}
            <h3>Send Message</h3>
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
              <div>
                <Button
                  color="primary"
                  id="toggler"
                  style={{ marginBottom: "1rem" }}
                >
                  Add Chips
                </Button>
                <div id="addChipDiv">
                  <UncontrolledCollapse toggler="#toggler">
                    <Card>
                      <CardBody>
                        How many chips would you like to send?
                        <br/>
                         You currently have {this.state.chips}.
                        <FormGroup>
                          <Label for="chipsToSend" />
                          <Input
                            type="number"
                            name="chipsToSend"
                            id="chipsToSend"
                            placeholder={this.state.chipsToSend}
                            onChange={this.handleInputChange}
                            value={this.state.chipsToSend}
                          />
                        </FormGroup>
                        <div>
                          <Collapse isOpen={this.state.collapse}>
                            <Card>
                              <CardBody id="chipChecker"></CardBody>
                            </Card>
                          </Collapse>
                        </div>
                        <div id="resetDiv">
                        <Button id="chipAdder" onClick={this.checkChips}>
                          Add Chips To Message
                        </Button>
                        
                          <Button style={{ display: "none" }} id="resetButton" onClick={this.resetChipSend}>
                            Reset
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div>
              </div>
              <Button
                disabled={!(this.state.receiver && this.state.body)}
                onClick={this.handleFormSubmit}
                color="primary"
                size="lg"
                block
                style={{ margin: "auto" }}
              >
                Send Message
              </Button>
              <h1 className="display-1">Inbox</h1>

              <Button
                onClick={this.provideMessagesB}
                color="primary"
                id="Popover1"
                size="lg"
                block
              >
                Show Messages
              </Button>

              <MessageList>
                {/* <button onClick={function displayMessages( event)  {
            <button onClick={function displayMessages( event)  {
              event.preventDefault();
              this.state.messageBody.map(message => {
                  return (
            
                    <MessageListItem id="center" >
                      <strong>
                        <h1>{message.data[0].body}</h1>
                      </strong>
                    </MessageListItem>
                    
                  );
//                 }) */}
                {/* }}>View Messages</button> */}

                <div id="messageDiv" />
              </MessageList>
            </Form>
          </CardBody>
        </Card>
        {/* {this.state.messageBody.map(message => {
                })
            }}>View Messages</button>

            <div id="messageDiv"></div>
            {/* {this.state.messageBody.map(message => {
                return (
                  <MessageListItem id="center" >
                    <strong>
                      <h1>{console.log(message.data[0].body)}</h1>
                    </strong>
                  </MessageListItem>
                  
                ); */}
        {/* })} */}

        {/* <MessageListItem id="center" key={message.id}> 
                  <strong>
                    <h1>{message.body}</h1>
                    <h1>{message.data.body}</h1>
                  </strong>
                  </MessageListItem>
                                )
              })} */}
        {/* <FormGroup>
              <Label for="exampleEmail">To (username):</Label>
              <Input
                type="textarea"
                name="reveiver"
                id="exampleEmail"
                onChange={this.handleInputChange}
                value={this.state.receiver}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">To (username):</Label>
              <Input
                type="textarea"
                name="reveiver"
                id="exampleEmail"
                onChange={this.handleInputChange}
                value={this.state.receiver}
              />
            </FormGroup> */}

        {/* {this.provideMessages} */}
        {/* // res.data.map((message) => { */}
        {/* //   return (
            //     <div><h1>{message.props.children}</h1></div>
            //   )
            // })
          
          // [1].props.children

          })
        } */}
        {/* ["0"].props.children */}

        {/* <Card body outline color="warning">
          <CardBody>
          <h1 color="info" className="display-2 text-center">Inbox</h1>
          {/* <p>{this.state.user}</p> */}
        {/* </Form>
          </CardBody>
        </Card> */}
      </div>
    );
  }
}

export default Messaging;
