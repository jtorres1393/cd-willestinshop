import React, { Component } from 'react';
import './main.css';
import {Route, Switch, Link} from 'react-router-dom';
import Home from '../home/home.js';
import Spirits from '../spirits/spirits.js';
import Shop from '../shop/shop.js';


class Main extends Component {
    constructor(){
        super();
        
        this.state = {
            win:[window.innerWidth,window.innerHeight],
            info: [],
            infoActive: false,
            page:"home",
            newsActive:false,
            mobile: false,
            mobileMenu: false

        }

    };

    componentDidMount(){
        this.getInfo();
        window.addEventListener('resize', this.resizeWin)
      
    }


    getInfo = () => {
      fetch(('/api/info'))
      .then(res => res.json())
      .then(data => this.setState({
          info: data.data,
          news: data.news},()=>{
            this.checkSection()
            this.resizeWin()
          }));

    }
    

    checkInfo=()=>{
      if(this.state.newsActive){
        this.closeNews();
      }
      if(this.state.mobileMenu){
        this.closeMobileMenu();
      }
      if(this.state.infoActive){
        this.closeInfo();
      }
      else{
        this.openInfo();
      }
    }

    openInfo=()=>{
      this.checkSection("info");
      this.setState({infoActive:true})
    }
    closeInfo=()=>{
      this.checkSection();
      this.setState({infoActive:false})
    }


    resizeWin= () => {
      this.setState({win:[window.innerWidth,window.innerHeight]},()=>{
        if((window.innerWidth <= 700) && !this.state.mobile){
          this.setState({mobile:true})
  
        }
        else if((window.innerWidth > 700) && this.state.mobile){
          this.setState({mobile:false})
        }
      })
      
    }

    getTime=(start, noYear)=>{
      var active = "";
      var today = (this.date)
     
      var first = new Date(start+"T12:00"+":00-07:00")
      
    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
    var dateFormat = "";
    var day = first.getDate();
    var monthIndex = first.getMonth();
    var year = first.getFullYear();
    if(noYear){
    dateFormat = `${monthNames[monthIndex]} ${day}`;
    }
    else
    {  dateFormat = `${monthNames[monthIndex]} ${day}, ${year}`;
    }
    return dateFormat
  }

  justForm = (string,cl) =>{
    
      var text = string.split(' ')
      let post = [];
      for (var i in text) {
        post.push(<p className={cl}>{text[i]}</p>)
      }
      return(post)
    
  }

  clickNews = () =>{
    if(this.state.infoActive){
      this.closeInfo()
    }
    if(!this.state.newsActive){
      this.setState({newsActive:true})
    }
  }

  closeNews = ()=>{

    this.setState({newsActive:false})
  }

  checkMobileMenu=()=>{
    if(this.state.mobileMenu){
      this.closeMobileMenu();
    }
    else{
      this.openMobileMenu();
    }
  }

  closeMobileMenu=()=>{
    this.setState({mobileMenu:false})
  }


  openMobileMenu=()=>{
    this.setState({mobileMenu:true})
  }

  //check
  closeAll =(e)=>{
    if(this.state.newsActive){
      this.closeNews();
    }
    if(this.state.mobileMenu){
      this.closeMobileMenu();
    }
    if(this.state.infoActive){
      this.setState({infoActive:false})
    }
   }

  checkSection=(e)=>{
    this.closeAll();
    var curr = window.location.href
    var currSec = curr.split('/')[3]
    currSec = currSec.toString()
    if(e){
      currSec= e
    }
    else if(!currSec){
      currSec = "home"
    }
   
      currSec = currSec.toString().toLowerCase();
      this.setState({page: currSec},()=>{
        var pass = document.getElementsByClassName('currentPage')
        if(pass.length){
          pass[0].classList.remove('currentPage')
        }
        var curr = document.getElementsByClassName(`${currSec}Link`)
        if(curr.length){
          curr[0].classList.add('currentPage')
        }


      })
    
  }

  fadeIn=(e)=>{
    e.target.style.opacity = 1;
  }

  goHome=()=>{
    this.checkSection('home');
  }

  



    render() {
      const { info } = this.state;
      const {win} = this.state;
      const {infoActive} = this.state;
      const {news} = this.state;
      const { newsActive } = this.state;
      const { mobile } = this.state;
      const {mobileMenu} = this.state;
    return (
    
      <React.Fragment>
        
      {info.length ?(
        <div id="appContain" style={{width: this.state.win[0]}} className={`relative ${newsActive?"inverse":""}`}>
            <Link to="/"><div className={`smallLogo ${(this.state.page !== "home" || (this.state.infoActive))?"activeLogo":""}`} data-page="home" onClick={this.goHome.bind(this)}>
                <img className={`fullWidth fullImg `} src={`images/wordmark.svg`} data-page="home"></img>
            </div></Link>
            {mobile?(
                <React.Fragment>
                    <div className="tCTA ptSm pbSm tRight cPointer tUpper mobileButton tWhite ctaLink" onClick={this.checkMobileMenu.bind(this)}>{mobileMenu?"close":"menu"}</div>                  
                  <div className={`fullScreen mobileMenu bgBlue ${mobileMenu?"active":""}`}>
                    <div className="fullStage centeredContent tWhite tUpper pbHuge">
                      <Link to="/"><h2 data-page="home" onClick={this.goHome.bind(this)} className="tCenter mbSm homeLink" >home</h2></Link>     
                      <Link to="/spirits"><h2 data-page="spirits" onClick={this.checkSection.bind(this)} className="tCenter mbSm spiritsLink" >spirits</h2></Link>     
                      <Link to="/shop"><h2 data-page="shop" onClick={this.checkSection.bind(this)} className="tCenter mbSm shopLink">shop</h2></Link>
                      <h2 className="cPointer tCenter infoLink ctaLink" onClick={this.checkInfo.bind(this)}>info</h2>                  
                    </div>
                  </div>
                </React.Fragment>
            ):(
            <div className="nav ptSm pbSm  flex flexEnd col2 tUpper tWhite" >
              <Link to="/"><div data-page="home" onClick={this.goHome.bind(this)} className=" tRight homeLink" >home</div></Link>     
              <Link to="/spirits"><div data-page="spirits" onClick={this.checkSection.bind(this)} className=" tRight plSm spiritsLink" >spirits</div></Link>     
              <Link to="/shop"><div data-page="shop" onClick={this.checkSection.bind(this)} className="tRight plSm shopLink" >shop</div></Link>
              <div className="plSm tRight cPointer infoLink ctaLink" onClick={this.checkInfo.bind(this)}>info</div>                  
            </div>

            )}
             {newsActive?(
                              <div className="newsOff backBut" onClick={this.closeNews.bind(this)}>
                                <img className="fullImg" src="/images/button-back.svg"></img>
                              </div>
                            ):('')}

            <div className={`relative fullWidth ${newsActive?('newsAct'):('')} ${((infoActive) ?"condenseStage":"")}`} style={{minHeight:'100vh'}}>
            {(news.length && (this.state.page === "home"))?(
              <div className={`newsHold bgWhite ptMed`} onClick={this.clickNews}>
                {!newsActive?(
                    <div className="newsAlert tUpper">
                        <div className=" centeredContent tWhite tCenter">
                            <p className="tCTA">{news[0].subTitle}</p>
                            <p className="tCTA">{this.getTime(news[0].date, true)}</p>
                          </div>
                        <img className="newsBorder fullWidth fullHeight spin" src="/images/icon-sticker.svg"></img>
                    </div>
                ):('')}
                <div className="newsContent">
                <div className="newsHeader fullStage eCenter">
                    <div className="bBot bBlue bBotSm tBlue tUpper fullWidth flex pbSm">{this.justForm(news[0].title,"newsHead")}</div>
                    <div className="bBot bBlue bBotSm tBlue tUpper fullWidth flex pbSm ptSm">
                      <h3>{news[0].subTitle}</h3>
                      <h3>{this.getTime(news[0].date)}</h3>
                    </div>
                    <div className="ptSm tBlue tUpper fullWidth flex pbSm">{this.justForm(news[0].tags,"newsSub")}</div>
                    <div className="newsBody fullWidth flex flexAStart ptMed bBotSm bRust ">
                    <div className="col23">
                        {news[0].media.length?(
                          <img src={news[0].media[0].url}></img>
                        ):('')}
                    </div>
                    <div className="col13 tBlue" dangerouslySetInnerHTML={{ __html : news[0].about }}></div>
                    </div>

                </div>
                </div>
              </div>
            ):('')}
              <div className={`relative fullWidth ${((newsActive) ?"condenseStage":"")}`} style={{minHeight:win[1]}}>
                <Switch>
                <Route path='/shop' render={()=><Shop resizeWin={this.resizeWin} checkSection={this.checkSection} mobile={this.state.mobile} infoActive={this.state.infoActive} info={this.state.info} win={this.state.win}/>} /> 
                <Route path='/spirits' render={()=><Spirits resizeWin={this.resizeWin} fadeIn={this.fadeIn} checkSection={this.checkSection} mobile={this.state.mobile} infoActive={this.state.infoActive} info={this.state.info} win={this.state.win}/>} /> 
                  <Route path='/' render={()=><Home resizeWin={this.resizeWin} checkSection={this.checkSection} info={this.state.info} win={this.state.win}/>} />

                </Switch>  
              </div>
              </div>
              <div className="footerHold fullWidth relative" style={{height:"100%"}}>
                <div className="footer fullWidth ">
                  <div className="fullStage eCenter flex flexACenter bWhite bTopSm pbSm ptSm footerFlex">
                    <div className="col3 iconHold flex flexACenter">
                        <img className="col3" src={`images/logo-roxcrew${newsActive?"-rust":""}.svg`}></img>
                      
                          <img className="col3" src={`images/logo-service${newsActive?"-rust":""}.svg`}></img>
                      
                        <img className="col3" src={`images/logo-ca-spirits${newsActive?"-rust":""}.svg`}></img>
                    </div>
                    <div className="address">
                        <p className="tDetails tWhite tCenter tUpper">{`${info[0].address}`}</p>
                        <p className="tDetails tWhite tCenter tUpper">{`${info[0].city}, ${info[0].state}`}</p>
                        
                    </div>
                    <div className="address">
                        <p className="tDetails tWhite tRight tUpper">{`${info[0].email}`}</p>
                        <p className="tDetails tWhite tRight tUpper">{`${info[0].phone}`}</p>
                    </div>

                  </div>
                </div>
              </div>
            <div className={"infoHold fixedScreen fullWidth ptLrg fullHeight bgvodka "+(this.state.infoActive?('active'):(''))}>
                  <div className="centeredContent fullWidth flex flexACenter pbLrg">
                  <div className="goodSpiritsHold col2 eCenter mtLrg mbLrg">
                      <img className="col23 eCenter" src="images/logo-goodspirits.svg"></img>
                  </div>
                  <div className="textHold col2 eCenter ptLrg">
                  <div className="info mbHuge col23 eCenter tWhite tCenter" dangerouslySetInnerHTML={{ __html : info[0].about}}></div>
                  </div>
                 </div>
            </div>
        </div>

      ):("")}
      
       </React.Fragment>
    
    );
  }
}

export default Main;
