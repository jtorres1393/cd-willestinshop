import React, { Component } from 'react';
import './spirits.css';
import {Route, Link} from 'react-router-dom';


class Spirits extends Component {
    constructor(){
        super();
        
        this.state = {
           data:[],
           current: null,
           spiritMode: false
        }

    };

    componentDidMount(){
      this.getData()
      this.props.checkSection();
      
    }

    getData=()=>{
      
      fetch(('/api/shopCat?category=spirits'))
      .then(res => res.json())
      .then(data => this.setState({
         data: data.data},()=>{
          var url = new URL(window.location.href);
          var id = url.searchParams.get('item')
          if(id){
            id.toLowerCase();
            this.setInit(id);
            this.props.resizeWin;
          }
         }));
      
    }
    
    setInit=(item)=>{
     var curr = document.querySelectorAll(`[data-name="${item}"]`);
     if(curr){
       var id = (parseInt(curr[0].dataset.id,10));
       console.log(id, curr)
       this.setActive(id)
     } 
    }
    itemClick = (e) => {
      var curr = (parseInt(e.currentTarget.dataset.id, 10));
      this.setActive(curr);
    }

    setActive = (curr) =>{
      this.setState({
        current: this.state.data[curr]
      },()=>{
      if(!this.state.spiritMode){
        this.setState({spiritMode:true})
      }
      var prev = document.getElementsByClassName(`activeSpirit`)
      if(prev.length){
        prev[0].classList.remove('activeSpirit')
      }
    
      var el = document.getElementById(`spirit${curr}`);
      if(el){
        el.classList.add('activeSpirit')
      }
    })
    }
  
    idleMode=()=>{
      var prev = document.getElementsByClassName(`activeSpirit`)
      if(prev.length){
        prev[0].classList.remove('activeSpirit')
      }
      if(this.state.spiritMode){
        this.setState({spiritMode:false, current:null})
      }

    }

    loadVid=()=>{
      console.log('loaded')
      var vid = document.getElementsByClassName('spiritVid');
      if(vid){
        vid[0].style.opacity = 1;
      }
    }

    render() {
      const { data } = this.state;
      const {current} = this.state;
      const { win } = this.props;
      const { spiritMode } = this.state;
      const { info } =this.props;
      const {mobile} = this.props;

    return (
    
      <React.Fragment>
        {spiritMode?(
                              <div className="spiritBut backBut" onClick={this.idleMode.bind(this)}>
                                <img className="fullImg" src="/images/button-back.svg"></img>
                              </div>
                            ):('')}
          <div className={"spiritsStage relative fullWidth "+(current?(`bg${current.subTitle}`):("bgrust"))} style={{minHeight:(mobile?(win[1]+200):(win[1]+150)), height:'auto'}}>
          
          {(spiritMode && current)?(
                      <React.Fragment>
                        <div className={`spiritInfo plSm prSm ptHuge fullHeight`}>
                            
                              <div className="productVid fullWidth relative eCenter">
                                  <div className="spiritDeet tCenter tUpper tDetails tWhite onStage">
                                    <div className="fullWidth mbLrg tBold">{current.details}</div>
                                    <div className="fullStage flex flexACenter eCenter">
                                        <div className="col4 tCenter">
                                          <p className="tNums">{current.proof}</p>
                                          <p className="tDetails tBold">proof</p>
                                        </div>
                                        <div className="col2 onStage" style={{transitionDelay:".3s"}}>
                                          <p className="tName">{current.subTitle}</p></div>
                                        <div className="col4 onStage" style={{transitionDelay:".6s"}}>
                                          <p className="tNums">{current.alcvol/100}%</p>
                                          <p className="tDetails tUpper tBold">alc/vol</p>
                                         </div>
                                    </div>
                                  </div>
                                {info[0].media.length?(
                                  info[0].media.map((item,i)=>{
                                    return(
                                      <React.Fragment>
                                    {item.type==="videos"?(
                                      <video autoPlay playsInline muted loop className="spiritVid centeredContent" key={item.url} onPlay={this.props.fadeIn.bind(this)}>
                                      <source key="currSource" src={item.url} type="video/mp4" />
                                      </video>


                                    ):("")}
                                    </React.Fragment>
                                    )
                                })
                                ):('')}
                            </div>
                            <div className="ptMed fullWidth pbLrg tWhite spiritTextHold">
                                <div className="spiritAbout eCenter relative onStage" style={{transitionDelay:"2.5s"}}>
                                  <p className="spiritText prMed">{current.about}</p>
                                </div>
                            </div>
                            
                        </div>
                       </React.Fragment>
                    ):("")}
            
        {data.length?(
    
            <div className={`fullWidth ptHuge pbHuge spiritContainer relative flex flexStart ${spiritMode?('spiritMode'):('')}`} >
           {data.map((item,i)=>{
              return(
                <React.Fragment>

                    {item.active?(
                      <React.Fragment>
                      <Link id={`spirit${i}`} to={`/spirits?item=${item.subTitle}`} className="singleSpirit" data-id={i} data-name={item.subTitle} onClick={this.itemClick} style={{transitionDelay:(i*.2)+"s"}} >
                        <div className={`spiritImgHold fullWidth`} data-id={i} >
                        {item.media.length?(
                          <div className="imageHold fullWidth" data-id={i} >
                          <img className="fullImg" onLoad={this.props.fadeIn.bind(this)} src={item.media[0].url} data-id={i} ></img>
                        </div>
                        ):("")}
                      </div>
                    </Link>
                    
                    </React.Fragment>

                    
                    

                    ):(
                      <div className={`singleSpirit inactive`} data-id={i} style={{transitionDelay:(i*.2)+"s"}} >
                      {item.media.length?(
                         <div className="imageHold fullWidth" data-id={i}>
                         <img className="fullImg" onLoad={this.props.fadeIn.bind(this)} src={item.media[0].url} data-id={i}></img>
                       </div>
                      ):("")}
                    </div>
                    )}
                </React.Fragment>
              )
            })}
            </div>
        ):('')}
          </div>
       </React.Fragment>
    
    );
  }
}

export default Spirits;
