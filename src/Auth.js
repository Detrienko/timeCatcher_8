import React, { Component } from 'react';
import firebase from './config/fbConfig';

export const AuthContext = React.createContext();

export class AuthProvider extends Component{

	state ={
		currentUser: null,
	}

	signOut = () => {
		firebase.auth().signOut();
		this.setState({currentUser: null})
	}


	componentDidMount(){
		console.log(this)
		const that = this;
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    that.setState({currentUser: user})
		  } else {
		    that.setState({currentUser: null})
		  }
		});
	}

	render(){
	return(
		<AuthContext.Provider 
			value={{
				state: this.state,
				signOut: this.signOut
			}}>
			{this.props.children}
		</AuthContext.Provider>	
		);	
	}
}