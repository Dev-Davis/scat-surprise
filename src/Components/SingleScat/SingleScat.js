import React from 'react';
import { Link } from 'react-router-dom';

import scatsData from '../../helpers/data/scatsData';

class Single extends React.Component {
  state = {
    scat: {},
  }

  componentDidMount() {
    const scatId = this.props.match.params.id;
    scatsData.getSingleScat(scatId)
      .then(scatPromise => this.setState({ scat: scatPromise.data }))
      .catch(err => console.error('cant get shit', err));
  }

  deleteScat = () => {
    const scatId = this.props.match.params.id;
    scatsData.deleteScat(scatId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to delete', err));
  }

  render() {
    const { scat } = this.state;
    // the id is not inside scat for single. It's in the params which has to be defined
    const editLink = `/edit/${this.props.match.params.id}`;
    return (
      <div className="Single">
        <h1>{scat.sampleNum}</h1>
        <h2>{scat.location}</h2>
        <Link className="btn btn-primary" to={editLink}>Edit</Link>
        <button className="btn btn-danger" onClick={this.deleteScat}>Delete</button>
      </div>
    );
  }
}

export default Single;
