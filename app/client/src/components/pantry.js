import React, { Component } from "react";
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
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
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
	button: {
		paddingLeft: 15,
		paddingRight: 15,
		margin: theme.spacing.unit * 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
	}
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

// let pantryItemsforSearch = [];

class Pantry extends Component {
	
    	
	constructor(props) {
		super(props);
		this.state = {
			pantryItems: [],
			open: false,
			ingredientName: "",
			openRecipes : false,
			openRecipe: false,
			recipeItems: [],
			selectedValue: {}
		};
	};

	handleClickOpen = (recipeID) => {
		this.handleRecipeRetrieval(recipeID);
		this.setState({
		  openRecipe: true,
		});
	};

	handleChange = event => {
		this.setState({ 
			[event.target.name]: event.target.value });
	};

	handleAddChange = event => {
		this.setState({
			ingredientName: event.target.value });
	};
	
	handlePageChange = (page) => {
		this.props.handlePageChange(page);
	};

	handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
	};

	handleRecipeClose = () => {
		this.setState({ openRecipe: false });
	};

	handleClickCloseListofRecipes = () => {
		this.setState({ openRecipes: false});
	};
	
	handleClickOpenListofRecipes = event => {
		this.handleSearchRecipes();
		this.setState({ openRecipes: true});
	};
	
	handleAddedClose = event => {
		// Use '/api/v2/ingredient/add' when is production.
		// Use 'v2/v2/ingredient/add when on local machine.
		//example ingredient/add?userID=1012
		axios.post('/v2/user/addToPantry',{
			
			userID: this.props.user.userID,
			ingredientName: this.state.ingredientName
		})
		.then((response) => {
			if(response.data === false) {
				console.log("Pantry could not be added.");
				console.log(response);
			}
			else 
			{
				console.log(response);
				this.handlePantryItems(this.props.user.userID);
				console.log('pantry items retrieved');
				console.log(this.state.pantryItems);
			}
		})
		.catch((error) => {
			console.log(error);
		});
		this.setState({open: false});
	};
	
	handleSearchRecipes = event => {
		// Use '/api/v1/getIngredient' when is production.
		// Use '/v1/getIngredient' when on local machine.
		//example getIngredient?userID=1012
		const pantryItemsforSearch = [];

		for(let i=0; i< this.state.pantryItems.length; i++) {
			pantryItemsforSearch.push(this.state.pantryItems[i].ingredientName);
		}

		console.log(pantryItemsforSearch);
		axios.post('/v2/recipe/search/pantry',{
			list: pantryItemsforSearch
		})
		.then((response) => {
			if(response.data.msg === "Nothing found") {
				console.log("Pantry could not be retreived.");
				console.log(response);
			}
			else 
			{
				console.log(response);
				this.setState({ recipeItems: response.data });
				console.log('pantry items retrieved');
				console.log(this.state.recipeItems);
			}
		})
		.catch((error) => {
			console.log(error);
		});
	};

	handlePantryItems = event => {
		// Use '/api/v1/getIngredient' when is production.
		// Use '/v1/getIngredient' when on local machine.
		//example getIngredient?userID=1012
		axios.get('/v2/user/pantry',{
			params: {
				userID: this.props.user.userID
			}
		})
		.then((response) => {
			if(response.data.length === 0) {
				console.log("Pantry could not be retreived.");
				console.log(response);
			}
			else 
			{
				console.log(response);
				this.setState({ pantryItems: response.data });
				console.log('pantry items retrieved');
				console.log(this.state.pantryItems);
				// for(let i=0; i< this.state.pantryItems.length; i++) {
				// 	pantryItemsforSearch.push(this.state.pantryItems[i].ingredientName);
				// }
				// console.log(pantryItemsforSearch);
			}
		})
		.catch((error) => {
			console.log(error);
		});
	};

	handleClickRemoveFromPantry = (userID, ingredientID) => {
		const token = localStorage.token;
		const headers = {
	'Authorization': 'Bearer ' + token,
		};
		if (token) {
				//this.handleFavoriteRemoval(userID, recipeID);
				// this.setState({
				//     open: false,
				// });
				// Use '/api//v2/user/removefromPantry' when is production.
				// Use '/v2/user/removefromPantry' when on local machine.
				//example removefromPantry?userID=1012
				axios.post('/v2/user/removefromPantry',{
								userID: userID,
								ingredientID: ingredientID,
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
								let pantryItems = [...this.state.pantryItems];
								pantryItems.splice(ingredientID, 1);
								this.setState({ pantryItems: pantryItems });
								console.log('Favorite item deleted');
								console.log(this.state.pantryItems);
								this.handlePantryItems(userID);
						}
				})
				.catch((error) => {
						console.log(headers);
						console.log(error);
				});
		}
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
	
	componentWillMount() {
		this.handlePantryItems();
	}

	render() {
		const { classes } = this.props;
		const data = this.state.pantryItems;
		const recipeData = this.state.recipeItems;

		return (
			<div>
				<div>
					<Typography style={styles.pageTitle} variant="headline">Pantry</Typography>
				</div>
				<div>
					<Dialog
						fullScreen
						open={this.state.openRecipes}
						onClose={this.handleClose}
						TransitionComponent={Transition}
					>
						<AppBar className={classes.appBar}>
							<Toolbar>
								<IconButton color="inherit" onClick={this.handleClickCloseListofRecipes} aria-label="Close">
									<CloseIcon />
								</IconButton>
								<Typography variant="h6" color="inherit" className={classes.flex}>
									List of Recipes Possible
								</Typography>
							</Toolbar>
						</AppBar>
						<div>
							<Grid container spacing={40}>
								{recipeData.map(recipeItems => (
									<Grid item key={recipeItems.recipeID} sm={6} md={4} lg={3}>
										<Card className={classes.card}>
											<CardMedia
												className={classes.cardMedia}
												image={recipeItems.recipeImageDir}
												title="Image title"
											/>
											<CardContent className={classes.cardContent}>
												<Typography gutterBottom variant="h5" component="h2">
													{recipeItems.recipeName}
												</Typography>
											</CardContent>
											<CardActions>
											<Button size="small" color="primary" onClick={() => this.handleClickOpen(recipeItems.recipeID)}>
													View
												</Button>
											</CardActions>
										</Card>
								</Grid>			
								))}			
							</Grid>
						</div>
					</Dialog>
				</div>
				<div className={classNames(classes.layout, classes.cardGrid)}>
					<Grid container spacing={40}>
						{data.map(pantryItem => (
							<Grid item key={pantryItem.pantryID} sm={6} md={4} lg={3}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image="https://static.thenounproject.com/png/489212-200.png" // eslint-disable-line max-len
										title="Image title"
									/>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant="h5" component="h2">
											{pantryItem.ingredientName}
										</Typography>
									</CardContent>
									<CardActions>
									<Button size="small" color="primary" onClick={() => this.handleClickRemoveFromPantry(this.props.user.userID ,pantryItem.ingredientID)}>
											Remove
										</Button>
									</CardActions>
								</Card>
						</Grid>			
						))}			
					</Grid>
				</div>
				<div>
					<Button variant="contained" className={classes.button} onClick={this.handleOpen}>
                    	Add Ingredients
          			</Button>
          			<Button id="getRecipesUsingIngredients" variant="contained" className={classes.button} onClick={this.handleClickOpenListofRecipes}>
						Get Recipes
					</Button>
				</div>
				<div>
				<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Ingredients</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Start typing name to add ingredient, ingredient would be added if not exists in cookable database.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="ingredientName"
              label="Enter Ingredient Name"
              //type="email"
							fullWidth
							onChange = {this.handleAddChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleAddedClose()} color="primary">
              Add Ingredient
            </Button>
          </DialogActions>
        </Dialog>
				</div>
				<Recipe
	          selectedValue={this.state.selectedValue}
	          open={this.state.openRecipe}
	          onClose={this.handleRecipeClose}
        	/>
			</div>
		);
	}
}

Pantry.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Pantry);