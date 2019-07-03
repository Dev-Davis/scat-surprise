import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

  editEvent = (e) => {
    e.preventDefault();
    const orderId = '123456';
    this.props.history.push(`/edit/${orderId}`);
  };
  render() {
    const singleLink = '/scat/123456';
    return (
      <div className="Home">
        <h1>Home</h1>
        <button className="btn btn-success"onClick={this.editEvent}>Editing S**t</button>
        <Link to={singleLink}>View Single</Link>
      </div>
    );
  }
}

export default Home;
