import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';





class Tip extends Component {
    constructor(){
        super();
        this.map="";
        this.oldLink="";
        this.state = {
            data:[],
            curr:[]

        }

    };

    componentWillUnmount(){
      this.props.hideTip()
    }
  
    componentDidMount(){
      var curr = window.location.href
      var ven = curr.split('/')[4]
      ven = ven.split('?')[0]
      var url = new URL(window.location.href);
      var loc = url.searchParams.get('loc');
      console.log(ven,loc)
      if(!loc){
        loc = 1;
      }
      this.getCurr(loc, ven);
      
    }

    


 
    getCurr=(loc, ven)=>{
      fetch((`/api/loc?id=${ven}&loc=${loc}`))
      .then(res => res.json())
      .then(data => this.setState({
         curr: data.data},()=>{
           this.props.showTip()
           this.props.moveMap(parseFloat(this.state.curr.lat), parseFloat(this.state.curr.long))
           if(this.state.curr.vendor[0].type==="bar"){
             this.props.barOn();
           }
         }));
    }




  


    render() {

      const { win } = this.props;
      const {curr} = this.state;
      const { tipActive } = this.props;

      
    
    return (
      <React.Fragment>
       {curr?(
          <React.Fragment>
        <div className={`tipHold tWhite`}>
             <div className="fullWidth prMed plMed">
             {curr.vendor?(
               <React.Fragment>
                 
                 {curr.vendor[0].media.length?(
                    <img className="fullImg mbSm" src={curr.vendor[0].media[0].url}></img>
                 ):(
                  <h1 className="mbSm tCap">{curr.vendor[0].name}</h1>
                 )}
                
                {curr.vendor[0].web?(
                  <a href={curr.vendor[0].web} target="blank" className="fullWidth"><p className="tDetails tUpper mbSm">{curr.vendor[0].web}</p></a>
               ):('')}
               </React.Fragment>
             ):('')}
             
              
              <a className="fullWidth" href={curr.map}>
              <p className="tDetails tUpper fullWidth">{curr.address}</p>
              <p className="tDetails tUpper fullWidth">{`${curr.city}, ${curr.state} ${curr.zip}`}</p>
              <p className="tDetails tUpper mbSm fullWidth">{`${curr.phone}`}</p></a>
              {curr.yelp?(
                  <a className="fullWidth mbMed" href={curr.yelp}><p className="tDetails tUpper fullWidth mbMed">Follow {curr.vendor?(curr.vendor[0].name):("Online")}</p></a>
                ):('')}
              </div>
              {curr.media?(
                  curr.media.map((img, p)=>{
                    return(
                      <img className="fullImg" src={img.url}></img>
                    )
                  })
                 ):('')}

          </div>
        </React.Fragment>)
        :('')}
    </React.Fragment>
    );
  }
}

export default Tip;
