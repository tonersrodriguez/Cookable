import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import "./styles/App.css";
import MainPage from './pageLayouts/mainPage.js';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  progress: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 20,
  },
  gif: {
    paddingTop: theme.spacing.unit * 30,
  },
});

class App extends Component {

  // Need to add user info from Authorization request.
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      completed: 0,
      loginStatus: false,
      user: {
        userID: '',
        username: '',
        emailAddress: '',
        isAdmin: false,
      }
    };
  }

  componentWillMount() {
    this.handleSessionAuthorization();
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ completed: 0, isLoading: false });
    } else {
      const diff = Math.random() * 300;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  handleLogin = (status) => {
    this.setState({ loginStatus: status });
  }

  handleLogout = (status) => {
    this.setState({ 
      loginStatus: status,
      user: {
        userID: '',
        username: '',
        emailAddress: '',
        isAdmin: false,
      }             
    });
    localStorage.removeItem("token");
  }

  handleUser = (user) => {
    this.setState({ user: user });
  }

  handleSessionAuthorization = () => {
    
    const token = localStorage.token;

    const headers = {
      'Authorization': 'Bearer ' + token,
    };

    if(token) {
      axios.get('/v2/protected', {
            headers:  headers,
        })
        .then((response) => {
            console.log(response);
            this.setState({ loginStatus: true, user: response.data });
        })
        .catch((error) => {
            console.log(error);
        });
    }
  }

  render() {

    const isLoading = this.state.isLoading;
    const { classes } = this.props;

    const renderMainPage = (
      <div>
        <MainPage 
          loginStatus={this.state.loginStatus}
          user={this.state.user}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout} 
          handleUser={this.handleUser}
        />
      </div>
    );

    const renderLoading = (
      <div>
        <div className={classes.gif}>
          <img src={require('./images/cookable.gif')} alt="loading ..." />
        </div>
        <div className={classes.progress}>
          <LinearProgress variant='determinate' value={this.state.completed}/>
        </div>
      </div>
    );

    return (
      <div className="App">
        {isLoading ? renderLoading : renderMainPage}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);