import React, { Component } from 'react';
import './home.css';
import {Route} from 'react-router-dom';


class Home extends Component {
    constructor(){
        super();
        
        this.state = {
           

        }

    };

    componentDidMount(){
      this.props.checkSection();
      this.props.resizeWin();
      
    }
    
 


  


    render() {
      const { info } = this.props;
    return (
    
      <React.Fragment>
      {info.length ?(
        <React.Fragment>
           
              <div className="bgVid fullScreen bgRust fixedScreen">
                  {info[0].media.length?(
                    info[0].media.map((item,i)=>{
                      return(
                        <React.Fragment>
                      {item.type==="videos"?(
                        <video autoPlay playsInline muted loop className="centeredContent" key={item.url}>
                        <source key="currSource" src={item.url} type="video/mp4" />
                        </video>


                      ):("")}
                      </React.Fragment>
                      )
                  })
                  ):('')}
              </div>
              <div className="fullStage centeredContent logoHold">
                  <img className="col23 pbHuge eCenter" src="images/logo.svg"></img>

              </div>
            
            </React.Fragment>

      ):("")}
      
       </React.Fragment>
    
    );
  }
}

export default Home;
