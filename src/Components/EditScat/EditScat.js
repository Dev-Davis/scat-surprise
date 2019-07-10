import React from 'react';

import scatsData from '../../helpers/data/scatsData';

import './EditScat.scss';

const defaultScat = {
  "location": '',
  "weight": '',
  "color": '',
  "sampleNum": '',
  "animal": '',
  "uid": ''
}

class EditScat extends React.Component {
  state =  {
      newScat: defaultScat,
    }

    componentDidMount(){
      const scatId = this.props.match.params.id;
      scatsData.getSingleScat(scatId)
        .then(scatPromise => this.setState({ newScat: scatPromise.data }))
        .catch(err => console.error('could not find single scat', err));
    }

  // generic function for what's the name of the event - generic way
  formFieldStringState = (name, e) => {
    const tempScat = { ...this.state.newScat };
    tempScat[name] = e.target.value;
    this.setState({ newScat: tempScat });
  }

  sampleNumChange = e => this.formFieldStringState('sampleNum', e);
  colorChange = e => this.formFieldStringState('color', e);
  weightChange = e => this.formFieldStringState('weight', e);
  locationChange = e => this.formFieldStringState('location', e);
  animalChange = e => this.formFieldStringState('animal', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newScat };
    const scatId = this.props.match.params.id;
    // console.error('thing to save', saveMe);
    scatsData.putScat(saveMe, scatId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to save', err));
  }

  
  render() {
    const { newScat } = this.state;
    return (
      <div className="Edit Scat">
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="sampleNum">Sample Name</label>
            <input 
            type="text" 
            className="form-control" 
            id="sampleName"
            placeholder="Sample 12"
            value={newScat.sampleNum}
            onChange={this.sampleNumChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <input 
            type="text" 
            className="form-control" 
            id="color"
            placeholder="Brown"
            value={newScat.color}
            onChange={this.colorChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input 
            type="text" 
            className="form-control" 
            id="weight"
            placeholder="7 lbs"
            value={newScat.weight}
            onChange={this.weightChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input 
            type="text" 
            className="form-control" 
            id="location"
            placeholder="Home"
            value={newScat.location}
            onChange={this.locationChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="animal">Animal</label>
            <input 
            type="text" 
            className="form-control" 
            id="animal"
            placeholder="Crow"
            value={newScat.animal}
            onChange={this.animalChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default EditScat;

