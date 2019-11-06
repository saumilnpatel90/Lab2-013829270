import React, { Component } from 'react';
import './App.css';
import './Sidebar.css';
import Main from './components/Main';
import {HashRouter} from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      //Use Browser Router to route to different pages
      <HashRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </HashRouter>
    );
  }
}

export default App;
