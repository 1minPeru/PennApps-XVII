import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SigninScreen from './routes/SigninScreen';

class App extends Component {
	render() {
		return (
			<div className="App">
				<SigninScreen />
			</div>
		);
	}
}

export default App;