import React, { Component } from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: '60%',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 800,
    },
  },
  user: {
    marginRight: 50,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class MainNavBar extends Component {
  constructor(props) {
  	super(props);
    this.state = {
      userMenuAnchor: null,
      profileMenuAnchor: null,
      loginMenuAnchor: null,
      mobileMoreAnchorEl: null,
      searchInput: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  };

  handlePageChange = (page) => {
    this.props.handlePageChange(page);
    this.handleMenuClose();
  };

  handleProfileSubpageChange = (subpage) => {
    this.props.handlePageChange('profilePage');
    this.props.handleProfileSubpageChange(subpage);
    this.handleMenuClose();
  };

  handleLogout = event => {
  	this.setState({ profileMenuAnchor: null });
  	this.props.handleLogout(false);
  };

  handleLoginMenuOpen = event => {
  	this.setState({ loginMenuAnchor: event.currentTarget });
  };

  handleUserMenuOpen = event => {
    this.setState({ userMenuAnchor: event.currentTarget });
  };

  handleProfileMenuOpen = event => {
    this.setState({ profileMenuAnchor: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ loginMenuAnchor: null });
    this.setState({ userMenuAnchor: null });
    this.setState({ profileMenuAnchor: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSearchEnter = event => {
    if(event.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleSearch = event => {
    this.props.handleSearch(this.state.searchInput);
    this.props.handlePageChange("recipeDisplayPage");
  };

  render() {
    const { 
      userMenuAnchor, 
      profileMenuAnchor, 
      loginMenuAnchor, 
      mobileMoreAnchorEl, } = this.state;
    const { classes, isAdmin } = this.props;
    const isLoggedIn = this.props.isLoggedIn;
    const username = this.props.username;
    const isLoginMenuOpen = Boolean(loginMenuAnchor);
    const isUserMenuOpen = Boolean(userMenuAnchor);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);  
    const isProfileMenuOpen = Boolean(profileMenuAnchor);  

    const renderProfileMenu = (
      <Menu
        anchorEl={profileMenuAnchor}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isProfileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={() => this.handleProfileSubpageChange('profileSettings')}>Profile</MenuItem>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Menu>
    );

    const renderLoginMenu = (
    	<Menu
      	anchorEl={loginMenuAnchor}
      	anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      	transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      	open={isLoginMenuOpen}
      	onClose={this.handleMenuClose}
      >
      	<MenuItem onClick={() => this.handlePageChange('loginPage')}>Login</MenuItem>
        <MenuItem onClick={() => this.handlePageChange('registerPage')}>Create Account</MenuItem>
      </Menu>
    );

    const renderUserMenu = (
      <Menu
        anchorEl={userMenuAnchor}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={isUserMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={() => this.handleProfileSubpageChange('pantry')}>Pantry</MenuItem>
        <MenuItem onClick={() => this.handleProfileSubpageChange('myRecipes')}>My Recipes</MenuItem>
        <MenuItem onClick={() => this.handleProfileSubpageChange('favorites')}>Favorites</MenuItem>
        <MenuItem onClick={() => this.handlePageChange('createRecipePage')}>Create Recipe</MenuItem>
      </Menu>
    );

    const renderUserButton = (
    	<div>
    		<IconButton 
            className={classes.menuButton} 
            color="inherit" aria-label="Open drawer"
            onClick={this.handleUserMenuOpen}
          >
              <MenuIcon />
        </IconButton>
    	</div>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {this.props.isLoggedIn ? renderUserButton : undefined}
            <Button 
            	className={classes.title}
            	color="inherit" 
            	onClick={() => this.handlePageChange('recommendationsPage')}>
              	Cookable
            </Button>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search by recipe name or ingredient ...'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                id='searchInput'
   							value={this.searchInput}
                onChange={this.handleInputChange}
                onKeyPress={this.handleSearchEnter}
              />
            </div>
            <div>
              <Button onClick={this.handleSearch} color="inherit">
                Search
              </Button>
            </div>
            <div className={classes.grow} />
            <div className={classes.user}>
              <Typography color="inherit">
                {isAdmin ? ("ADMIN ") : undefined}
              </Typography>
              <Typography color="inherit">
                {isLoggedIn ? ("Logged in as " + username) : "Login Menu"}
              </Typography>
            </div>
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isProfileMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={isLoggedIn ? this.handleProfileMenuOpen : this.handleLoginMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {isLoggedIn ? renderProfileMenu : renderLoginMenu}
        {renderUserMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

MainNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainNavBar);