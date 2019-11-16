import React, { Component } from 'react';


class About extends Component {
    constructor(){
        super();
        
        this.state = {
           

        }

    };

    componentDidMount(){
      this.props.checkSection();
      this.props.checkInfo();
      
    }

    componentWillUnmount(){
      this.props.closeInfo();
    }
    
 


  


    render() {
    return (
        <React.Fragment></React.Fragment>
    );
  }
}

export default About;
