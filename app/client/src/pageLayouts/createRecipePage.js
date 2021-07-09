import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FolderIcon from '@material-ui/icons/Folder';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
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
  add: {
    marginTop: theme.spacing.unit * 3,
    width: '45%',
    padding: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class CreateRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: "",
      description: "",
      cookingTime: "",
      instructions: [],
      ingredients: [],
      cuisine: "",
      imageURL: "",
      instructionValue: "",
      ingredientValue: "",
      response:'',
      open: false, 
      responseTitle: '',  
    };
  };
  handleCreateRecipe = e => {
    if (this.state.recipeName.length === 0) {
      this.handleResponse("It seems you have not provided a recipe name. Please provide a valid recipe name and try again.", "No recipe name");
    }
    else if ((this.state.description.length === 0)) {
      this.handleResponse("It seems you have not provided a recipe description. Please provide a valid recipe description and try again", "No description")
    }
    else if ((this.state.cookingTime.length === 0)) {
      this.handleResponse("It seems you have not provided a cooking time. Please provide a valid cooking time and try again", "No cooking time")
    }
    else if ((this.state.instructions.length === 0)) {
      this.handleResponse("It seems you have not provided instructions. Please provide a valid set of instrucions and try again", "No instructions")
    }
    else if ((this.state.ingredients.length === 0)) {
      this.handleResponse("It seems you have not provided a ingredient(s). Please provide a valid ingredient(s) and try again", "No ingredients")
    }
    else if ((this.state.cuisine.length === 0)) {
      this.handleResponse("It seems you have not provided a cuisine type. Please provide a valid cuisine type and try again", "No cuisine type")
    }
    else if ((this.state.imageURL.length === 0)) {
      this.handleResponse("It seems you have not provided a valid image URL. Please provide a valid URL ending in jpg and try again", "No image")
    }
    else {
      axios.post('/v2/recipe/create', {
      
        id: this.props.userID,
        recipeName: this.state.recipeName,
        description: this.state.description,
        cookingTime: this.state.cookingTime,
        instructions: this.state.instructions,
        ingredients: this.state.ingredients,
        cuisine: this.state.cuisine,
        imageUrl: this.state.imageURL,

      },
      )
        .then((response) => {
          console.log(response);
          this.handleResponse("Your recipe was successfully created and added to your recipes! Thank you for adding your personal recipe to Cookable!", "Recipe Creation Complete!");
          this.setState({recipeName: '', description: '', cookingTime: '', instructions: [], ingredients: [], cuisine: '', imageURL: ''}); 
        })

        .catch((error) => {
          console.log(error);
          this.handleResponse("Sorry but your recipe could not be created.","ERROR: Could not create recipe"); 
        });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleInstructionsAdd = event => {
    const instructionValue = this.state.instructionValue;
    const instructions = Array.from(this.state.instructions);
    if(instructionValue.length > 0){
      instructions.push(instructionValue);
    }
    this.setState({ instructions: instructions, instructionValue: "" });
  }

  handleIngredientsAdd = event => {
    const ingredientValue = this.state.ingredientValue
    const ingredients = Array.from(this.state.ingredients);
    if (ingredientValue.length > 0){
      ingredients.push(ingredientValue);
    }
    this.setState({ ingredients: ingredients, ingredientValue: "" });
  }

  handleResponse = (response, responseTitle) => {
    this.setState({ open: true, response: response, responseTitle: responseTitle });
  }

  handleResponseClose = () => {
    this.setState({ open: false, response: '', });
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FolderIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add A New Recipe
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="recipeName">Recipe Name</InputLabel>
              <Input id="recipeName" name="recipeName" autoFocus value={this.state.description}
                value={this.state.recipeName}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input name="description" type="description" id="description" autoComplete="current-password"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="cookingTime">Cooking Time</InputLabel>
              <Input id="cookingTime" name="cookingTime"
                value={this.state.cookingTime}
                onChange={this.handleChange}
                inputProps={{
                  name: 'cookingTime',
                  id: 'cookingTime',
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="instructions">Instructions</InputLabel>
              <Input id="instructionValue" name="instructionValue"
                value={this.state.instructionValue}
                onChange={this.handleChange}
              />
              {(this.state.instructions && this.state.instructions.length > 0) ?
                  (<ol>
                    {this.state.instructions.map(step => (
                      <li>
                        <Typography component="p">
                          {step}
                        </Typography>
                      </li>
                    ))}
                  </ol>) :
                  undefined
                }
              <div> <Button
                as="input"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.add}
                onClick={this.handleInstructionsAdd}
              >
                Add
          </Button>
              </div>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="ingredients">Ingredients</InputLabel>
              <Input id="ingredientValue" name="ingredientValue"
                value={this.state.ingredientValue}
                onChange={this.handleChange}
              />
              {(this.state.ingredients && this.state.ingredients.length > 0) ?
                  (<ul>
                    {this.state.ingredients.map(ingredient => (
                      <li>
                        <Typography component="p">
                          {ingredient}
                        </Typography>
                      </li>
                    ))}
                  </ul>) :
                  undefined
                }
              <div> <Button
                as="input"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.add}
                onClick={this.handleIngredientsAdd}
              >
                Add
          </Button></div>
            </FormControl>
            <FormControl className={classes.formControl} required fullWidth>
              <InputLabel htmlFor="cuisine">Cuisine</InputLabel>
              <Select
                input={<Input id="cuisine" name="cuisine" />}
                value={this.state.cuisine}
                onChange={this.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Snack">Snack</MenuItem>
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Brunch">Brunch</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
              </Select>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="imageURL">Upload Image</InputLabel>
              <Input id="imageURL" name="imageURL"
                value={this.state.imageURL}
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              as="input"
              fullWidth
              variant="contained"
              color="primary"

              className={classes.submit}
              onClick={this.handleCreateRecipe}
            >
              Submit
          </Button>
            <Button
              as="input"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Cancel
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

CreateRecipePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateRecipePage);