import React, { Component } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Recipe from '../components/recipe.js';
import Response from '../components/response.js';

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

class RecipeDisplayPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchResult: [],
			selectedValue: {},
			open: false,
			responseOpen: false,
			response: '',
      		responseTitle: '',
		};
	}

	handleSearch = (searchInput) => {
		// Use '/api/v1/searchIngredients' when is production.
		// Use '/v1/searchIngredients' when on local machine.
		axios.get('/v2/recipe/search', {
			params: {
				recipe: searchInput
			}
		})
		.then((response) => {
			if(response.data.length === 0) {
				this.handleResponse("We're sorry, but there doesn't seem to be any recipes that match your search. Please try again.", "Recipe doesn't exist!")
				console.log(response);
			}
			else {
				console.log(response);
				this.setState({ searchResult: response.data });
			}
		})
		.catch((error) => {
			console.log(error);
		});
	}
	
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
	}

	handleClickOpen = (recipeID) => {
		this.handleRecipeRetrieval(recipeID);
		this.setState({ open: true, });
	}

	handleClose = value => {
		this.setState({ selectedValue: value, open: false });
		this.handleSearch(this.props.searchInput);
	}

	handleResponse = (response, responseTitle) => {
	    this.setState({ responseOpen: true, response: response, responseTitle: responseTitle });
	}

  	handleResponseClose = () => {
	    this.setState({ responseOpen: false, response: '', responseTitle: '' });
	}

	componentWillMount() {
		console.log(this.props.searchInput);
		this.handleSearch(this.props.searchInput);
	}

	componentDidUpdate(prevProps) {
		if (this.props.searchInput !== prevProps.searchInput) {
			this.handleSearch(this.props.searchInput);
		}
	}

	render() {
		const { classes } = this.props;
		const data = this.state.searchResult;

		return (
			<div>
				<React.Fragment>
					<CssBaseline />
					<main>
						{/* Hero unit */}
						<div className={classes.heroUnit}>
							<div className={classes.heroContent}>
								<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
									Recipe Results
								</Typography>
								<Typography variant="h6" align="center" color="textSecondary" paragraph>
									Here are the search results for the recipe name or ingredient!
								</Typography>
							</div>
						</div>
						<div className={classNames(classes.layout, classes.cardGrid)}>
							{/* End hero unit */}
							<Grid container spacing={40}>
								{data.map(recipe => (
									<Grid item key={recipe.recipeID} sm={6} md={4} lg={3}>
										<Card className={classes.card}>
											<CardMedia
												className={classes.cardMedia}
												image={recipe.url}
												title="Image title"
											/>
											<CardContent className={classes.cardContent}>
												<Typography gutterBottom variant="h5" component="h2">
													{recipe.recipeName}
												</Typography>
												<Typography>
													{recipe.description}
												</Typography>
											</CardContent>
											<CardActions>
												<Button size="small" color="primary" onClick={() => this.handleClickOpen(recipe.recipeID)}>
													View
												</Button>
											</CardActions>
										</Card>
									</Grid>
								))}
							</Grid>
						</div>
					</main>
					{/* Footer */}
					<footer className={classes.footer}>
						<Typography variant="h6" align="center" gutterBottom>
							Cookable
						</Typography>
						<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
							Copyright cookable.com
						</Typography>
					</footer>
					{/* End footer */}
				</React.Fragment>
				<Recipe
					selectedValue={this.state.selectedValue}
					open={this.state.open}
					onClose={this.handleClose}
					userID={this.props.userID}
					isAdmin={this.props.isAdmin}
				/>
				<Response 
		          	open={this.state.responseOpen}
		          	onClose={this.handleResponseClose}
		          	response={this.state.response}
		          	responseTitle={this.state.responseTitle}
		        />
			</div>
		);
	}
}

RecipeDisplayPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeDisplayPage);