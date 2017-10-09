import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>{this.props.message}</h1>
        <h2>{this.props.remaining}</h2>
        <input type="button" value={this.props.state} onClick={this.props.onClick}/>
      </div>
    );
  }
}

export default App;
