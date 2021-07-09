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


class MyRecipes extends Component {
	
    constructor(props) {
		super(props);
		this.state = {
			myRecipes: [],
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

	handleClickRemoveFromMyRecipes = (userID ,recipeID) => {
		const token = localStorage.token;
		const headers = {
			'Authorization': 'Bearer ' + token,
		};
		if (token) {
				//this.handleClickRemoveFromMyRecipes(userID, recipeID);
				// this.setState({
				//     open: false,
				// });
				// Use '/api//v2/user/deleteRecipe' when is production.
				// Use '/v2/user/deleteRecipe' when on local machine.
				//example deleteRecipe?userID=1012
				axios.post('/v2/user/deleteRecipe',{
								userID: userID,
								recipeID: recipeID,
						},
						{
							headers: headers
						})
				.then((response) => {
						if(response.data.length === 0) {
								console.log("My Recipe item could not be removed.");
								console.log(response);
						}
						else
						{
								console.log(response);
								let myRecipes = [...this.state.myRecipes];
								myRecipes.splice(recipeID, 1);
								this.setState({ myRecipes: myRecipes });
								console.log('my Recipe item deleted');
								console.log(this.state.myRecipes);
								this.handleMyRecipes(userID);
						}
				})
				.catch((error) => {
						console.log(headers);
						console.log(error);
				});
			}
		
	};

	handleMyRecipes = event => {
		// Use '/api/v2/user/myRecipes' when is production.
		// Use '/v2/user/myRecipes' when on local machine.
		//example myRecipes?userID=1012
		axios.get('/v2/user/myRecipes',{
			params: {
				userID: this.props.user.userID
			}
		})
		.then((response) => {
			if(response.data.length === 0) {
				console.log("My Recipes could not be retreived.");
				console.log(response);
			}
			else 
			{
				console.log(response);
				this.setState({ myRecipes: response.data });
				console.log('My Recipe items retrieved');
				console.log(this.state.myRecipes);
			}
		})
		.catch((error) => {
			console.log(error);
		});
	};

	handleClose = value => {
		this.setState({ selectedValue: value, open: false });
	};

	componentDidMount() {
		this.handleMyRecipes();
	};
	
	render() {
		const { classes } = this.props;
		const myRecipes = this.state.myRecipes;
		return (
			<div>
				<div className={classNames(classes.layout, classes.cardGrid)}>
								{/* End hero unit */}
								<Grid container spacing={40}>
									{myRecipes.map(myRecipes => (
										<Grid item key={myRecipes.recipeID} sm={6} md={4} lg={3}>
											<Card className={classes.card}>
												<CardMedia
													className={classes.cardMedia}
													image={myRecipes.url}
													title="Image title"
												/>
												<CardContent className={classes.cardContent}>
													<Typography gutterBottom variant="h5" component="h2">
														{myRecipes.recipeName}
													</Typography>
													<Typography>
														{myRecipes.description}
													</Typography>
												</CardContent>
												<CardActions>
													<Button size="small" color="primary" onClick={() => this.handleClickOpen(myRecipes.recipeID)}>
														View
													</Button>
													<Button size="small" color="primary" onClick={() => this.handleClickRemoveFromMyRecipes(this.props.user.userID ,myRecipes.recipeID)}>
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

MyRecipes.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(MyRecipes);