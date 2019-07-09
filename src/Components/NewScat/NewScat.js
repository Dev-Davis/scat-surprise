import React from 'react';

const defaultScat = {
  "location": '',
  "weight": '',
  "color": '',
  "sampleNum": '',
  "animal": ''
}

class NewScat extends React.Component {
  state =  {
      newScat: defaultScat,
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

  // sampleNumChange = (e) => {
  //   e.preventDefault();
  //   const tempScat = { ...this.state.newScat };
  //   tempScat['sampleName'] = e.target.value;
  //   this.setState({ newScat: tempScat });
  // };

  // colorChange = (e) => {
  //   e.preventDefault();
  //   const tempScat = { ...this.state.newScat };
  //   tempScat['sampleName'] = e.target.value;
  //   this.setState({ newScat: tempScat });
  // };
  
  render() {
    const { newScat } = this.state;
    return (
      <div className="New">
        <form>
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

export default NewScat;
