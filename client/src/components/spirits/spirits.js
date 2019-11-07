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
         data: data.data}));
      
    }
    
 
    itemClick = (e) => {
      var curr = (parseInt(e.currentTarget.dataset.id, 10));
      this.setState({
        current: this.state.data[curr]
      },()=>{
        this.setActive(curr);
      })
    }

    setActive = (curr) =>{
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
          <div className={"spiritsStage relative fullWidth "+(current?(`bg${current.subTitle}`):("bgrust"))} style={{minHeight:(mobile?(win[1]+200):(win[1]+150)), height:'auto'}}>
          
          {(spiritMode && current)?(
                      <React.Fragment>
                        <div className={`spiritInfo plSm prSm ptHuge fullHeight`}>
                              <div className="productVid fullWidth relative eCenter">
                                  <div className="spiritDeet tCenter tUpper tDetails tWhite">
                                    <div className="fullWidth mbLrg tBold">{current.details}</div>
                                    <div className="fullStage flex flexACenter eCenter">
                                        <div className="col4 tCenter">
                                          <p className="tNums">{current.proof}</p>
                                          <p className="tDetails tBold">proof</p>
                                        </div>
                                        <div className="col2">
                                          <p className="tName">{current.subTitle}</p></div>
                                        <div className="col4">
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
                                      <video autoPlay playsInline muted loop className="centeredContent" key={item.url}>
                                      <source key="currSource" src={item.url} type="video/mp4" />
                                      </video>


                                    ):("")}
                                    </React.Fragment>
                                    )
                                })
                                ):('')}
                            </div>
                            <div className="ptMed fullWidth pbLrg tWhite">
                                <div className="spiritAbout eCenter relative">
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
                      <Link id={`spirit${i}`} to={`/spirits?item=${item.subTitle}`} className="singleSpirit" data-id={i} onClick={this.itemClick} style={{transitionDelay:(i*.2)+"s"}} >
                        <div className={`spiritImgHold fullWidth`} data-id={i} >
                        {item.media.length?(
                          <div className="imageHold fullWidth" data-id={i} >
                          <img className="fullImg" src={item.media[0].url} data-id={i} ></img>
                        </div>
                        ):("")}
                      </div>
                    </Link>
                    
                    </React.Fragment>

                    
                    

                    ):(
                      <div className={`singleSpirit inactive`} data-id={i} style={{transitionDelay:(i*.2)+"s"}} >
                      {item.media.length?(
                         <div className="imageHold fullWidth" data-id={i}>
                         <img className="fullImg" src={item.media[0].url} data-id={i}></img>
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
