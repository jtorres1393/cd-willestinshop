import React, { Component } from 'react';
import { Link} from 'react-router-dom';

class BarMark extends Component {
  constructor(){
    super();

};
  

  render() {
    
    return (
      <Link to={`/vendors/${this.props.slug}?loc=${this.props.loc}`}>
      <div className="mapBar sizer"></div></Link>
      
    );
  }
}

export default BarMark;