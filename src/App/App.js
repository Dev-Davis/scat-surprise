import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import Home from '../Components/Home/Home';
import Auth from '../Components/Auth/Auth';
import MyNavbar from '../Components/MyNavbar/MyNavbar';

import './App.scss';

import firebaseConnect from '../helpers/data/firebaseConnect';

firebaseConnect();

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
    const loadComponent = () => {
      if (authed) {
        return <Home />;
      }
      return <Auth />
    };

    return (
      <div className="App">
        <MyNavbar authed={authed}/>
        {loadComponent()}
      </div>
    );
  }
}

export default App;
