import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "react-datepicker/dist/react-datepicker.css";
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  paper: {
    height: '100%',
    width: '25%',
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  control: {
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: 200,
    flexBasis: 200,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  // // Selects label that comes right after the autofilled input
  // input:-webkit-autofill + .mdl-textfield__label {
  //   // Insert your active label styles
  //  },
});

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      // fName: "",
      // lName: "",
      // gender: "",
      // email: "",
      // username: "",
      // dob: new Date(),
      // oldPassword: "",
      // newPassword: "",
      // confirmNewPassword: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    spacing: '16',
  };

  
  // handleChange = key => (event, value) => {
  //   this.setState({
  //     [key]: value,
  //   });
  // };
  handleChange = key => (event, value) => {
    this.setState({
      [value]: event.target.value,
    });
  };

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDateChange = (date) => {
    this.setState({
      dob: date,
    });
  };
  
  handleRadioChange = (gender) => {
    console.log("RadioChangeinit");
    this.setState({
      radio: gender,
    });
  };
  saveInfo = (userID) => {

  };
  handleProfile = event => {
		// Use 'v2/user/profile' when is production.
		// Use 'v2/user/profile' when on local machine.
		//example v2/user/profile?userID=1012
		axios.get('/v2/user/profile',{
			params: {
				userID: this.props.user.userID
			}
		})
		.then((response) => {
			if(response.data.length === 0) {
				console.log("Profile not found.");
				console.log(response);
			}
			else 
			{
				console.log(response);
				this.setState({ profile: response.data });
				console.log(this.state.profile);
			}
		})
		.catch((error) => {
			console.log(error);
		});
  };
  componentWillMount () {
    this.handleProfile();
  };


  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number(spacing)}>
            <Paper className={classes.paper}>
              <Typography style={styles.pageTitle} variant="headline">Profile</Typography>
              <form style={styles.form}>
                    <TextField
                      style={styles.textField}
                      id="fName"
                      label="First Name"
                      class={styles.input} 
                      value={this.state.profile.fName}
                      InputLabelProps={{ shrink: true }}
                      onChange={this.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                   <br />
                    <TextField
                      style={styles.textField}
                      id="lName"
                      label="Last Name"
                      value={this.state.profile.lName}
                      InputLabelProps={{ shrink: true }}
                      onChange={this.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <br />
                    <div className={classes.root}>
                      <form onSubmit={this.handleSubmit}>
                        <FormControl component="fieldset" className={classes.margin}>
                          <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                              aria-label="Gender"
                              name="gender"
                              className={classes.group}
                              value={this.state.profile.gender}
                              onChange={this.handleRadioChange}
                            >
                              <FormControlLabel value="female" control={<Radio checked={this.state.profile.gender === 'female'} />} label="Female" />
                              <FormControlLabel value="male" control={<Radio checked={this.state.profile.gender === 'male'} />} label="Male" />
                              <FormControlLabel value="other" control={<Radio checked={this.state.profile.gender === 'female'} />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                      </form>
                    </div>
                    <TextField
                      style={styles.textField}
                      id="username"
                      label="emailAddress"
                      value={this.state.profile.emailAddress}
                      onChange={this.handleChange}
                      margin="normal"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <br />
                    <form className={classes.container} noValidate>
                      <TextField
                        id="date"
                        style={styles.TextField}
                        value={this.state.profile.dob}
                        //onChange={this.handleDateChange}
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </form>
                   <br />
                    <div className={classes.heroButtons}>
										<Grid container spacing={16} justify="center">
											<Grid item>
                        {/* need to figure out props */}
												<Button variant="contained" color="primary" onClick={() => this.saveInfo(this.user.userID)}>
                        Save Info
												</Button>
											</Grid>
											<Grid item>
												<Button variant="outlined" color="primary" onClick={() => this.handlePageChange('registerPage')}>
                        Cancel
												</Button>
											</Grid>
										</Grid>
                    <br />
									</div>
                  </form>
            </Paper>
            <Paper className={classes.paper}>
              <form style={styles.form}>
              <Typography style={styles.pageTitle} variant="headline">Update Password</Typography>
              <TextField
                      style={styles.textField}
                      id="oldPassword"
                      label="Old Password"
                      value={this.state.oldPassword}
                      onChange={this.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
              <br />
              <TextField
                      style={styles.textField}
                      id="newPassword"
                      label="New Password"
                      value={this.state.newPassword}
                      onChange={this.handleChange}
                      margin="normal"
                      variant="outlined"
              />
              <br />
              <TextField
                      style={styles.textField}
                      id="confirmNewPassword"
                      label="Confirm New Password"
                      value={this.state.confirmNewPassword}
                      onChange={this.handleChange}
                      margin="normal"
                      variant="outlined"
              />
              <br />
              <Button variant="contained" className={classes.button} style={styles.button}>
              Update Password
              </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProfileSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSettings);
