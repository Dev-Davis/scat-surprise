import React from 'react';
import firebase from 'firebase/app';

import ScatCard from '../ScatCard/ScatCard';

import scatsData from '../../helpers/data/scatsData';

class Home extends React.Component {
  state = {
    scats: [],
  }

  componentDidMount = () => {
    const { uid } = firebase.auth().currentUser;
    scatsData.getScats(uid)
      .then(scats => this.setState({scats}))
      .catch(err => console.error('could not get scats', err));
  }

  editEvent = (e) => {
    e.preventDefault();
    const orderId = '123456';
    this.props.history.push(`/edit/${orderId}`);
  };
  render() {
    const makeCards = this.state.scats.map(scat => (
      <ScatCard
        key={scat.id}
        scat={scat}
      />
    ));

    return (
      <div className="Home col">
          <h1>Home</h1>
          <div className="d-flex">
          {makeCards}
        </div>
      </div>
    );
  }
}

export default Home;
