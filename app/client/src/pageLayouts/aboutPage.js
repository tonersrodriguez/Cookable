import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Profile from '../components/profile.js'

class AboutPage extends Component {
	
	constructor(props) {
		super(props);
		this.handleProfileClick = this.handleProfileClick.bind(this);
		this.state = {
			anchorEl: null,
			profileId: null,
			isProfileOpen: null
		};
	}

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	}

	handleClose = () => {
		this.setState({ anchorEl: null });
	}

	handleProfileClick = (x) => {
		this.setState({ profileId: x });
		this.setState({ isProfileOpen: true });
	}

	render() {
		const { anchorEl } = this.state;
		const { profileId } = this.state;
		const { isProfileOpen } = this.state;

		const profiles = [
			{id: 1, name: 'Trevor Sampson', role: 'Team Lead'},
			{id: 2, name: 'Thanh Dip', role: 'Back-end Lead'},
			{id: 3, name: 'Tony Rodriguez', role: 'Front-end Lead'},
			{id: 4, name: 'Shivam Rai', role: 'Front-end Developer'},
			{id: 5, name: 'Pyae Naing', role: 'Back-end Developer'},
			{id: 6, name: 'Surabhi Chavan', role: 'Front-end Developer'}
		];

		return (
			<div>
				<Button
          			aria-owns={anchorEl ? 'aboutPage' : undefined}
          			aria-haspopup="true"
          			onClick={this.handleClick}
        		>
        			About 
        		</Button>
        		<Menu
        			id="aboutPage"
        			anchorE1={anchorEl}
        			open={Boolean(anchorEl)}
        			onClose={this.handleClose}
        		>
        			<MenuItem onClick={(e) => this.handleProfileClick(0)}>Trevor Sampson</MenuItem>
        			<MenuItem onClick={(e) => this.handleProfileClick(1)}>Thanh Dip</MenuItem>
        			<MenuItem onClick={(e) => this.handleProfileClick(2)}>Tony Rodriguez</MenuItem>
        			<MenuItem onClick={(e) => this.handleProfileClick(3)}>Shivam Rai</MenuItem>
        			<MenuItem onClick={(e) => this.handleProfileClick(4)}>Pyae Naing</MenuItem>
        			<MenuItem onClick={(e) => this.handleProfileClick(5)}>Surabhi Chavan</MenuItem>
        		</Menu>
        		{isProfileOpen ? (
        			<Profile 
        				name={profiles[profileId].name} 
        				role={profiles[profileId].role}
        			/>
				) : (null)
        		}
        	</div>
		);
	}
}

export default AboutPage;