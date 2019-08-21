import React, { Component } from 'react';
import './main.css';
import {Route} from 'react-router-dom';


class Main extends Component {
    constructor(){
        super();
        
        this.state = {
            win:[window.innerWidth,window.innerHeight],
            info: [],
            infoActive: false
        }

    };

    componentDidMount(){
        this.getInfo();
        document.addEventListener("touchmove", this.preventBehavior, {passive: false});
      
    }


    preventBehavior=(e)=> {
      e.preventDefault(); 
  };

    getInfo = () => {
      fetch(('/api/info'))
      .then(res => res.json())
      .then(data => this.setState({
          info: data.data}));

    }
    
    checkInfo=()=>{
      if(this.state.infoActive){
        this.closeInfo();
      }
      else{
        this.openInfo();
      }
    }

    openInfo=()=>{
      this.setState({infoActive:true})
    }
    closeInfo=()=>{
      this.setState({infoActive:false})
    }


    resizeWin= () => {
      this.setState({win:[window.innerWidth,window.innerHeight]})
    }


    render() {
      const { info } = this.state;
    return (
    
      <React.Fragment>
      {info.length ?(
        <div id="appContain" style={{height: this.state.win[1]+"px", width: this.state.win[0]+"px"}}>
            <div className="nav ptSm pbSm bgCover" onClick={this.checkInfo.bind(this)}></div>
            <div className="bgVid fullWidth fullHeight bgRust fixedScreen">
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
                <h1 className="tUpper tCenter fullWidth mbHuge tWhite">Good things are coming.</h1>
                <img className="fullImg pbHuge" src="images/logo.svg"></img>

            </div>
            <div className="footer fullWidth ">
              <div className="fullStage eCenter flex flexACenter bWhite bTopSm pbSm ptSm footerFlex">
                <div className="col3 iconHold flex">
                    <img className="col3" src="images/logo-roxcrew.svg"></img>
                    <div className="col3">
                    <img className="fullImg" src="images/logo-service.png"></img>
                    </div>
                    <img className="col3" src="images/logo-ca-spirits.svg"></img>
                </div>
                <div className="col3 address">
                    <p className="tDetails tWhite tCenter tUpper">{`${info[0].address}, ${info[0].city}`}</p>
                </div>
                <div className="col3 address">
                    <p className="tDetails tWhite tRight tUpper">{`${info[0].email}`}</p>
                </div>

              </div>
            </div>
            <div className={"infoHold fixedScreen fullWidth fullHeight bgRust "+(this.state.infoActive?('active'):(''))}>
                  <div className="goodSpiritsHold fullStage eCenter mtLrg mbLrg">
                      <img className="col4 eCenter" src="images/logo-goodspirits.svg"></img>
                  </div>
                  <div className="textHold fullStage eCenter">
                 <div className="info mbHuge col23 eCenter tWhite tCenter" dangerouslySetInnerHTML={{ __html : info[0].about}}></div>
                 </div>
            </div>
        </div>

      ):("")}
      
       </React.Fragment>
    
    );
  }
}

export default Main;
