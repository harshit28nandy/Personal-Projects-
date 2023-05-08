import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import {getUserAuth} from "./actions/index.js";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);


  return (
    <div className="App">
      <Router>
          <Switch>
              <Route exact path ='/' component={Login}>
                <Login/>
              </Route>
              <Route exact path ='/home' >
                <Header/>
                <Home/>
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return{};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
  
});

export default connect(mapStateToProps, mapDispatchToProps) (App);

