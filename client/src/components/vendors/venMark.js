import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';

class VenMark extends Component {
  constructor(){
    super();

};

  

  render() {
    
    return (
      <Link to={`/vendors/${this.props.slug}?loc=${this.props.loc}`}>
      <div className="mapMarker sizer"></div>
      </Link>
    );
  }
}

export default VenMark;