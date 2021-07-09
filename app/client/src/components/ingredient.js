import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Ingredient extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		query: this.props.query
    	};
  }

  render() {

    const renderIngredients = (
      <ol>
        {this.props.ingredientList.map((ingredient) => 
          <li key={ingredient.ingredientID}>
            <Typography component="p">
              The ingredient name: {ingredient.ingredientName}, 
              The ingredient ID in the MySQL database: {ingredient.ingredientID}, 
              The ingredient Type in the MySQL database: {ingredient.ingredientType}
            </Typography>
            <br />
          </li>
        )}
      </ol>
    );

  	return (
  		<div>
  			<Paper p='60px' square={true}>
  				<Typography variant="h5" component="h3">
        		Thank you for using Cookable! Here are the ingredient search results containing: '{this.props.query}'.
      		</Typography>
      		{renderIngredients}
  			</Paper>
  		</div>
  	);
  }
}

export default Ingredient;