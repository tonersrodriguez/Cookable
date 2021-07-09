import React, { Component } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Response from '../components/response.js';
import PrivacyPolicy from '../components/privacyPolicy.js';

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

class RegisterPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
      open: false,
      response: '',
      responseTitle: '',
      privacyOpen: false,
		};
	}

	handleCreateUser = event => {
    if(this.state.email.length === 0) {
      this.handleResponse("It seems you haven't provided an email address. Please provide a valid email address and submit the form again.", "No email");
    }
    else if(!(this.validateEmail(this.state.email))) {
      this.handleResponse("The email address that you have provided is invalid. Please provide a valid email address and submit the form again.", "Invalid email");
    }
    else if(this.state.username.length === 0) {
      this.handleResponse("It seems you haven't provided a username. Please provide a username and submit the form again.", "No username");
    }
    else if(this.state.password.length === 0) {
      this.handleResponse("It seems you haven't provided a password. Please provide and password and submit the form again.", "No password");
    }
		else if(this.state.password !== this.state.confirmPassword) {
      this.handleResponse("The passwords that you have provided do not match. Please re-enter the password and submit the form again.", "Passwords do not match");
		}
    else {
      // Use '/api/v2/user/create' when is production.
      // Use '/v2/user/create' when on local machine.
      axios.post('/v2/user/create', {
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              confirmPassword: this.state.confirmPassword,
          })
          .then((response) => {
              console.log(response);
              this.handleResponse("Your account was successfully created! Thank you for joining Cookable!", "Registration Complete!");
          })
          .catch((error) => {
              console.log(error);
          });
    }
	}

  validateEmail = (email) => {
    const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailFormat.test(String(email).toLowerCase());
  }

  handleResponse = (response, responseTitle) => {
    this.setState({ open: true, response: response, responseTitle: responseTitle });
  }

  handleResponseClose = () => {
    this.setState({ open: false, response: '', responseTitle: '' });
  }

  handlePrivacyPolicy = () => {
    this.setState({ privacyOpen: true });
  }

  handlePrivacyPolicyClose = () => {
    this.setState({ privacyOpen: false });
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
        				Register
      			</Typography>
      			<form className={classes.form}>
      				<FormControl margin="normal" required fullWidth>
        				<InputLabel htmlFor="email">Email Address</InputLabel>
        				<Input id="email" name="email" autoComplete="email" onChange={this.handleChange} autoFocus />
      				</FormControl>
      				<FormControl margin="normal" required fullWidth>
        				<InputLabel htmlFor="username">Username</InputLabel>
        				<Input id="username" name="username" autoComplete="username" onChange={this.handleChange} />
      				</FormControl>
      				<FormControl margin="normal" required fullWidth>
        				<InputLabel htmlFor="password">Password</InputLabel>
        				<Input name="password" type="password" id="password" onChange={this.handleChange} autoComplete="current-password" />
      				</FormControl>
      				<FormControl margin="normal" required fullWidth>
        				<InputLabel htmlFor="password">Confirm Password</InputLabel>
        				<Input name="confirmPassword" type="password" id="confirmPassword" onChange={this.handleChange} autoComplete="current-password" />
      				</FormControl>
      				<FormControlLabel
        				control={<Checkbox value="terms" color="primary" />}
        				label="I accept the Terms of Service."
      				/>
              <Button onClick={this.handlePrivacyPolicy} color="primary" autoFocus>
                Privacy Policy
              </Button>
      				<Button
        				fullWidth
        				variant="contained"
        				color="primary"
        				className={classes.submit}
        				onClick={this.handleCreateUser}
      				>
        				Create Account
      				</Button>
      			</form>
    			</Paper>
    		</main>
        <Response 
          open={this.state.open}
          onClose={this.handleResponseClose}
          response={this.state.response}
          responseTitle={this.state.responseTitle}
          handlePageChange={this.props.handlePageChange}
        />
        <PrivacyPolicy
          open={this.state.privacyOpen}
          onClose={this.handlePrivacyPolicyClose}
        />
      </div>
		);
	};
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterPage);