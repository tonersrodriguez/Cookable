import React, { Component } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Response from '../components/response.js';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LoginPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			password: "",
      open: false,
      response: '',
      responseTitle: '',
		};
	}

	handleLogin = event => {
  // Use '/api/v2/user/login' when is production.
  // Use '/v2/user/login' when on local machine.
		axios.post('/v2/user/login', {
      		user: this.state.user,
      		password: this.state.password,
	    })
	    .then((response) => {
        console.log(response);
        if(response.data === "User does not exist") {
          this.handleResponse("We're sorry, but the user that you have provided does not exist. Please try again.", "User does not exist")
        }
        else if(response.data === "Incorrect Password") {
          this.handleResponse("We're sorry, but the password you provided for the given username is incorrect. Please try again.", "Incorrect Password")
        }
        else {
          this.props.handleUser(
            { 
              userID: response.data.userID,
              username: response.data.username,
              emailAddress: response.data.emailAddress,
              isAdmin: response.data.isAdmin,
            }
          );
	      	this.props.handleLoginStatus(true);
          localStorage.setItem("token", response.data.token);
          this.props.handlePageChange("recommendationsPage");
        }
	    })
	    .catch((error) => {
	      	console.log(error);
	    });
	}

  handleResponse = (response, responseTitle) => {
    this.setState({ open: true, response: response, responseTitle: responseTitle });
  }

  handleResponseClose = () => {
    this.setState({ open: false, response: '', responseTitle: '' });
  }
	
	handleChange = event => {
		this.setState({
      		[event.target.id]: event.target.value
    });
	}

	render() {
		const { classes } = this.props;

		return (
      <div>
  			<main className={classes.main}>
    			<CssBaseline />
    			<Paper className={classes.paper}>
      			<Avatar className={classes.avatar}>
        				<LockOutlinedIcon />
      			</Avatar>
      			<Typography component="h1" variant="h5">
        				Sign in
      			</Typography>
      			<form className={classes.form}>
        				<FormControl margin="normal" required fullWidth>
          				<InputLabel htmlFor="user">Username or Email Address</InputLabel>
          				<Input id="user" name="user" onChange={this.handleChange} autoComplete="user" autoFocus />
        				</FormControl>
        				<FormControl margin="normal" required fullWidth>
          				<InputLabel htmlFor="password">Password</InputLabel>
          				<Input name="password" type="password" id="password" onChange={this.handleChange} autoComplete="current-password" />
        				</FormControl>
        				<Button
          				fullWidth
          				variant="contained"
          				color="primary"
          				className={classes.submit}
          				onClick={this.handleLogin}
        				>
          				Sign in
        				</Button>
      			</form>
    			</Paper>
    		</main>
        <Response 
          open={this.state.open}
          onClose={this.handleResponseClose}
          response={this.state.response}
          responseTitle={this.state.responseTitle}
        />
      </div>
		);
	};
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);