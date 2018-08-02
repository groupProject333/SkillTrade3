import React from 'react';
import { Button } from "reactstrap"
import './message.css'
const DeleteButton = props => (
    <Button className="delete-btn" id="format" {...props}>
      Delete
    </Button>
  );
  
export default DeleteButton;