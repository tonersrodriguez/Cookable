import React, { Component } from "react";
import axios from "axios";
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Recipe from '../components/recipe.js';


const styles = theme => ({
	appBar: {
		position: 'relative',
	},
	icon: {
		marginRight: theme.spacing.unit * 2,
	},
	heroUnit: {
		backgroundColor: theme.palette.background.paper,
	},
	heroContent: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
	},
	heroButtons: {
		marginTop: theme.spacing.unit * 4,
		marginBottom: theme.spacing.unit * 4,
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
			width: 1100,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	cardGrid: {
		padding: `${theme.spacing.unit * 8}px 0`,
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing.unit * 6,
	},
});

//const cards = [1, 2, 3, 4, 5, 6, 7, 8];

class Favorites extends Component {
	
    constructor(props) {
		super(props);
		this.state = {
			favorites: [],
			selectedValue: {},
			open: false
		};
	};
	
	handlePageChange = (page) => {
		this.props.handlePageChange(page);
	};

	handleClickOpen = (recipeID) => {
		this.handleRecipeRetrieval(recipeID);
		this.setState({
		  open: true,
		});
	};

	handleClickRemoveFromFavorites = (userID, recipeID) => {
		const token = localStorage.token;
		const headers = {
			'Authorization': 'Bearer ' + token,
		};
		if (token) {
				//this.handleFavoriteRemoval(userID, recipeID);
				// this.setState({
				//     open: false,
				// });
				// Use '/api//v2/user/favorites' when is production.
				// Use '/v2/user/favorites' when on local machine.
				//example favorites?userID=1012
				axios.post('/v2/user/favorite/remove',{
								userID: userID,
								recipeID: recipeID,
						},
						{
							headers: headers
						})
				.then((response) => {
						if(response.data.length === 0) {
								console.log("Favorite item could not be removed.");
								console.log(response);
						}
						else
						{
								console.log(response);
								let favorites = [...this.state.favorites];
								favorites.splice(recipeID, 1);
								this.setState({ favorites: favorites });
								console.log('Favorite item deleted');
								console.log(this.state.favorites);
								this.handleFavorites(userID);
						}
				})
				.catch((error) => {
						console.log(headers);
						console.log(error);
				});
		}
};

	handleClose = value => {
		this.setState({ selectedValue: value, open: false });
	};
	
	handleRecipeRetrieval = (recipeID) => {
		axios.get(('/v2/recipe/' + recipeID))
	  .then((response) => {
		if(response.data.length === 0) {
			console.log("Could not retrieve recipe.");
		  console.log(response);
		}
		else {
			console.log(response);
		  this.setState({ selectedValue: response.data });
		  console.log(this.state.selectedValue);
		}
	  })
	  .catch((error) => {
		console.log(error);
	  });
	};

	handleFavorites = event => {
		// Use '/api//v2/user/favorites' when is production.
		// Use '/v2/user/favorites3' when on local machine.
		//example favorites?userID=1012
		axios.get('/v2/user/favorites',{
			params: {
				userID: this.props.user.userID
			}
		})
		.then((response) => {
			if(response.data.length === 0) {
				console.log("Favorites could not be retreived.");
				console.log(response);
			}
			else 
			{
				console.log(response);
				this.setState({ favorites: response.data });
				console.log("Favorites retrieved");
				console.log(this.state.favorites);
			}
		})
		.catch((error) => {
			console.log(error);
		});
	};

	componentDidMount() {
		this.handleFavorites();
	};
	render() {
		const { classes } = this.props;
		const favorites = this.state.favorites;
		return (
			<div>
				<div className={classNames(classes.layout, classes.cardGrid)}>
								{/* End hero unit */}
								<Grid container spacing={40}>
									{favorites.map(favorites => (
										<Grid item key={favorites.recipeID} sm={6} md={4} lg={3}>
											<Card className={classes.card}>
												<CardMedia
													className={classes.cardMedia}
													image={favorites.url}
													title="Image title"
												/>
												<CardContent className={classes.cardContent}>
													<Typography gutterBottom variant="h5" component="h2">
														{favorites.recipeName}
													</Typography>
													<Typography>
														{favorites.description}
													</Typography>
												</CardContent>
												<CardActions>
													<Button size="small" color="primary" onClick={() => this.handleClickOpen(favorites.recipeID)}>
														View
													</Button>
													<Button size="small" color="primary" onClick={() => this.handleClickRemoveFromFavorites(this.props.user.userID ,favorites.recipeID)}>
														Remove
													</Button>
												</CardActions>
											</Card>
										</Grid>
									))}
								</Grid>
							</div>
			<Recipe
	          selectedValue={this.state.selectedValue}
	          open={this.state.open}
	          onClose={this.handleClose}
        	/>
			</div>
		);
	}
}

Favorites.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Favorites);