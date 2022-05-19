import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/loginpage/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/admin">
            <App/>
          </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
