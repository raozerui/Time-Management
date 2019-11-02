import React, { Component, ComponentType } from 'react';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import FinishedRecord from './views/finished-record/index'
import {SideBar}from './components/side'

const routes:[string, ComponentType][] = [
  ['/', FinishedRecord]
]


function page404() {
  return (
  <div style={{height:'100%',background:'#fff'}}>404</div>
  )
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <SideBar />
        <BrowserRouter>
          <Switch>
            {routes.map(([path, component]) => <Route key={path} path={path} component={component}/>)}
            <Route component={page404}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
