import React from 'react';
import { 
  BrowserRouter, 
  Route, 
  Redirect, 
  Switch } 
  from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import Home from '../Components/Home/Home';
import Auth from '../Components/Auth/Auth';
import MyNavbar from '../Components/MyNavbar/MyNavbar';
import NewScat from '../Components/NewScat/NewScat';
import EditScat from '../Components/EditScat/EditScat';
import SingleScat from '../Components/SingleScat/SingleScat';

import './App.scss';

import firebaseConnect from '../helpers/data/firebaseConnect';

firebaseConnect();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location}}}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)} />
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location}}}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)} />
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <div className="container">
              <div className="row">
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={authed} />
                  <PrivateRoute path='/home' component={Home} authed={authed} />
                  <PrivateRoute path='/new' component={NewScat} authed={authed} />
                  <PrivateRoute path='/edit/:id' component={EditScat} authed={authed} />
                  <PrivateRoute path='/scat/:id' component={SingleScat} authed={authed} />
                  <Redirect from="*" to="/auth" />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
