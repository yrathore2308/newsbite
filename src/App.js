import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export class App extends Component {
  pageSize=10;
  apiKey='06ab3d721c8a4d998a112bc5a21bd008'
  state={
    progress:0
  }
  setProgress=(val)=>{
    this.setState({
      progress:val
    })
  }
  render() {
    return (
      
      <AmplifyAuthenticator>
      <div>
        <Router>

        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
        
      />
        <Switch>
          {/* By giving key value to news component we can remount the component once we click on any category button */}
        <Route exact path="/"><News apiKey={this.apiKey} setProgress={this.setProgress}  key="general" pagesize={this.pageSize} country="in" category="general"/></Route>
        <Route exact path="/business"><News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pagesize={this.pageSize} country="in" category="business"/></Route>
        <Route exact path="/sports"><News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pagesize={this.pageSize} country="in" category="sports"/></Route>
        <Route exact path="/technology"><News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pagesize={this.pageSize} country="in" category="technology"/></Route>
        <Route exact path="/health"><News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pagesize={this.pageSize} country="in" category="health"/></Route>
        <Route exact path="/science"><News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pagesize={this.pageSize} country="in" category="science"/></Route>
        <Route exact path="/entertainment"><News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pagesize={this.pageSize} country="in" category="entertainment"/></Route>
        </Switch>
        </Router>
      </div>
    </AmplifyAuthenticator>
    )
  }
}

export default withAuthenticator(App)

