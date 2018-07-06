import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/Nav';
import routes from './routes';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Nav location={window.location.hash.split('#')[1]} />
        {routes}
      </div>
    );
  }
}

export default App;
