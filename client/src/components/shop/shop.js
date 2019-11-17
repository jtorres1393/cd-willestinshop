import React, { Component } from 'react';
import './shop.css';


class Shop extends Component {
    constructor(){
        super();
        
        this.state = {
           

        }

    };

    componentDidMount(){
      this.props.checkSection();
      
    }
    
 


  


    render() {
      const { win } = this.props;
    return (
    
      <div className="fullScreen bgRust" style={{minHeight: win[1]}}>
        <h2 className="centeredContent tWhite tCap pbHuge tCenter fullWidth">coming soon</h2>
      
       </div>
    
    );
  }
}

export default Shop;
