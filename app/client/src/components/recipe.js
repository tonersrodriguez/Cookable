import React, { Component } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Response from './response.js';

const styles = theme => ({
	card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  }
});

class Recipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      response: '',
      responseTitle: '',
    };
  }

	handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleAddFavorite = (userID, recipeID) => {
    const token = localStorage.token;

    const headers = {
      'Authorization': 'Bearer ' + token,
    };

    if(token) {
      axios.post('/v2/user/favorite/add', {
              userID: userID,
              recipeID: recipeID,
          }, 
          {
            headers: headers,
          })
          .then((response) => {
              console.log(response);
              if(response.statusText === "Created") {
                this.handleResponse("Recipe was successfully added to your favorites.", "Success!");
              }
              else if(response.statusText === "OK") {
                this.handleResponse("Looks like it's already in your favorites.", "Whoops!");
              }
          })
          .catch((error) => {
              console.log(error);
          });
    }
    else {
      console.log("Must be logged in to perform this action");
    }
  };

  handleAdminDeleteRecipe = (userID, recipeID) => {
    const token = localStorage.token;

    const headers = {
      'Authorization': 'Bearer ' + token,
    };

    axios.post('/v2/admin/deleteRecipe', {
        userID: userID,
        recipeID: recipeID,
    },
    {
      headers: headers,
    })
    .then((response) => {
        console.log(response);
        if(response.data.msg === "Recipe removed") {
          this.handleResponse("Recipe was successfully removed.", "Success!");
        }
        else {
          this.handleResponse("Recipe could not be removed.", "Error!");
        }
    })
    .catch((error) => {
        console.log(error);
    });
    console.log("handleAdminDeleteRecipe");
  };

  handleResponse = (response, responseTitle) => {
    this.setState({ open: true, response: response, responseTitle: responseTitle });
  };

  handleResponseClose = () => {
    this.setState({ open: false, response: '', responseTitle: '' });
  };
	
	render() {
    const { classes, onClose, selectedValue, userID, isAdmin, ...other } = this.props;

    const renderAdminDeleteButton = (
      <Button onClick={() => this.handleAdminDeleteRecipe(userID, selectedValue.recipeID)} variant="contained" color="primary">
        Delete
      </Button>
    );
    
    return (
      <div>
        <Dialog scroll="paper" onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
          <DialogContent>
             <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <IconButton onClick={() => this.handleAddFavorite(userID, selectedValue.recipeID)}>
                    <FavoriteIcon/>
                  </IconButton>
                }
                title={selectedValue.recipeName}
              />
              <CardMedia
                className={classes.media}
                image={((selectedValue.recipeImages && selectedValue.recipeImages.length > 0) ? selectedValue.recipeImages[0].recipeImageDir : "No Image")}
                title={selectedValue.recipeName}
              />
              <CardContent>
                <Typography component="p">
                  {selectedValue.description}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography paragraph>Ingredients:</Typography>
                {(selectedValue.ingredientsListFulls && selectedValue.ingredientsListFulls.length > 0) ?
                  (<ul>
                    {selectedValue.ingredientsListFulls.map(ingredient => (
                      <li key={ingredient.ingredientsListFullID}>
                        <Typography component="p">
                          {ingredient.ingredientsFull}
                        </Typography>
                      </li>
                    ))}
                  </ul>) :
                  undefined
                }
              </CardContent>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                {(selectedValue.instructions && selectedValue.instructions.length > 0) ?
                  (<ol>
                    {selectedValue.instructions.map(step => (
                      <li key={step.instructionKeyID}>
                        <Typography component="p">
                          {step.instruction}
                        </Typography>
                      </li>
                    ))}
                  </ol>) :
                  undefined
                }
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            {(isAdmin) ? renderAdminDeleteButton : undefined}
          </DialogActions>
        </Dialog>
        <Response 
            open={this.state.open}
            onClose={this.handleResponseClose}
            response={this.state.response}
            responseTitle={this.state.responseTitle}
        />
      </div>
    );
  }
}

Recipe.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.object,
};

export default withStyles(styles)(Recipe);