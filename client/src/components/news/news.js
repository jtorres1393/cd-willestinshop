import React, { Component } from 'react';


class News extends Component {
    constructor(){
        super();
        
        this.state = {
           

        }

    };

    componentDidMount(){
      this.props.checkSection();
      this.props.clickNews();
      
    }

    componentWillUnmount(){
      this.props.closeNews();
    }
    
 


  


    render() {
    return (
        <React.Fragment></React.Fragment>
    );
  }
}

export default News;
