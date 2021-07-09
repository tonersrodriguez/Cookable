import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class Response extends Component {
	
  handlePageChange = (page) => {
    this.props.handlePageChange("loginPage");
  }

	render() {
		const { response, responseTitle, open, onClose } = this.props;

    const renderLoginButton = (
      <Button onClick={() => this.handlePageChange("loginPage")} color="primary" autoFocus>
        Login
      </Button>
    );

		return (
			<div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{responseTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {response}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {(responseTitle === "Registration Complete!") ? renderLoginButton : undefined}
            <Button onClick={onClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
		);
	}
}

export default Response;