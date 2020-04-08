import React, { Component } from 'react';
import './main.css';
import ls from 'local-storage'
import {Route, Switch, Link} from 'react-router-dom';
import Home from '../home/home.js';
import Spirits from '../spirits/spirits.js';
import Shop from '../shop/shop.js';
import RSVP from '../rsvp/rsvp.js';
import News from '../news/news.js';
import About from '../about/about.js';
import Invoice from '../invoice/invoice.js';
import Vendors from '../vendors/vendors.js';
import Cart from '../checkout/cart.js';
import Checkout from '../checkout/checkout.js';



class Main extends Component {
    constructor(){
        super();
        this.mapKeys = {}
        this.state = {
            win:[window.innerWidth,window.innerHeight],
            info: [],
            infoActive: false,
            page:"home",
            newsActive:false,
            mobile: false,
            mobileMenu: false,
            rsvpActive: false,
            mapActive:false,
            hideVen:false,
            viewCart:false,
            cart:[],
            subTotal:0,
            tax:0,
            shipping:0,
            total:0,
            imgSize: 1300,

        }

    };

    componentDidMount(){
        this.getInfo();
        window.addEventListener('resize', this.resizeWin)
        window.addEventListener('keydown', this.cartCheck, false); 
      
    }


    getInfo = () => {
      fetch(('/api/info'))
      .then(res => res.json())
      .then(data => this.setState({
          info: data.data,
          news: data.news,
          cart: ls.get('cart') || []},()=>{
            this.checkSection()
            this.resizeWin()
            this.getSub();
          }));

    }

    urlText=(str)=>{
      return(str.replace(/\s+/g, '-').toLowerCase())
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
        if((window.innerWidth <= 750) && !this.state.mobile){
          this.setState({mobile:true, imgSize:800})
  
        }
        else if((window.innerWidth > 750) && this.state.mobile){
          this.setState({mobile:false, imgSize:1500})
        }
      })
      
    }

    getTime=(start, noYear)=>{

     
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
        post.push(<p key={`justForm-${i}`}className={cl}>{text[i]}</p>)
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

  openRSVP=()=>{
    this.setState({rsvpActive:true})
  }

  closeRSVP=()=>{
    this.setState({rsvpActive:false})
  }

  mapOn=()=>{
    this.setState({mapActive:true})
  }

  mapOff=()=>{
    this.setState({mapActive:false})
  }
  venToggle=()=>{
    this.setState({hideVen:!this.state.hideVen})
  }

  showVen=()=>{
    this.setState({hideVen:false})
  }

  venOff=()=>{
    this.setState({hideVen:false})
  }
  

  // cart
    //cart edit
    changeOpt=(e)=>{
      var curr = (e.target).getAttribute('data-id')
      var value = e.target.value;
      var array = [...this.state.cart];
      array[curr].option = value
      ls.set("cart", array);
      this.setState({cart: array},()=>{
          this.setCart(array)
          this.getSub();
      });
  
  }

  changeQ=(e)=>{
    var curr = (e.target).getAttribute('data-id')
    var value = e.target.value;
    var array = [...this.state.cart];
    array[curr].quantity = value
    ls.set("cart", array);
    this.setState({cart: array},()=>{
        this.setCart(array)
        this.getSub();
    });

}
  
  addCart=(item)=>{
    let hold = this.state.cart;
    console.log(item);
    hold.push(item)
    ls.set("cart", hold);
    this.setState({cart: hold},()=>{
      
        this.getSub();
    })
  }
  
  setCart=(i)=>{
    ls.set("cart", i);
    this.setState({cart: i});
  }
  
  removeItem=(e)=>{
      
    var curr = (e.target).getAttribute('data-id')
    var array = [...this.state.cart];
  
    array.splice(curr, 1);
    ls.set("cart", array);
    this.setState({cart: array},()=>{
        this.setCart(array)
        this.getSub();
    });
  
  }
  
  subIn=(e)=>{
    var curr = (e.target).getAttribute('data-id')
    var array = [...this.state.cart];
    var val = array[curr].quantity
    if(val > 1){
        array[curr].quantity = val - 1;
        ls.set("cart", array);
        this.setState({cart: array},()=>{
        this.setCart(array)
        this.getSub();
         });
    }
  
  
  }
  
  addIn=(e)=>{
    var curr = (e.target).getAttribute('data-id')
    var array = [...this.state.cart];
    var val = parseInt(array[curr].quantity)
    var op = parseInt(array[curr].option)
    var stock = parseInt(array[curr].item.shopOptions[op].stock)
    if(val < stock )
        array[curr].quantity = val + 1;
        ls.set("cart", array);
        this.setState({cart: array},()=>{
        this.setCart(array)
        this.getSub();
         });
    
  }

  openCart=()=>{
    this.setState({viewCart:true})
  }

  closeCart=()=>{
    this.setState({viewCart:false})
  }

  cartCheck=(e)=>{
    this.mapKeys[e.key] = e.type === 'keydown';
   
    if(this.state.viewCart && e.key==="Escape"){
        this.closeCart();

    }
}



  getSub=()=>{
    var total = 0;
    this.state.cart.forEach((item,i)=>{
        var quantity = parseInt(item.quantity)
        var cost = parseInt(item.item.shopOptions[item.option].cost)
        var curr = quantity * cost
        total = total + curr
    })
    this.setState({subTotal: total},()=>{
      this.getTax();
    })

  }

  getTax=()=>{
    var tax = this.state.info[0].tax/10000;
    var curr = Math.ceil(this.state.subTotal*tax)
    this.setState({tax: curr},()=>{
      this.getTotal()
    })
  }

  getTotal=()=>{
    var curr = this.state.tax + this.state.subTotal;
    this.setState({total:curr})
  }

  getImg=(name)=>{
    const url = `https://willes.imgix.net/${name}?auto=compress&w=${this.state.imgSize}&fit=clip`;
    return(url)
  }

    render() {
      const { info } = this.state;
      const {win} = this.state;
      const {infoActive} = this.state;
      const {news} = this.state;
      const { newsActive } = this.state;
      const { mobile } = this.state;
      const {mobileMenu} = this.state;
      const {rsvpActive} = this.state;
      const {mapActive} = this.state;
      const {hideVen } = this.state;
    return (
    
      <React.Fragment>
        
      {info.length ?(
        <React.Fragment>
          <Route path='/' render={()=><Cart closeCart={this.closeCart} shipping={this.state.shipping} subTotal={this.state.subTotal} tax={this.state.tax} total={this.state.total} removeItem={this.removeItem} addIn={this.addIn} subIn={this.subIn} changeQ={this.changeQ} changeOpt={this.changeOpt} cart={this.state.cart} resizeWin={this.resizeWin} mobile={this.state.mobile} viewCart={this.state.viewCart} info={this.state.info[0]} win={this.state.win}/>} />          
          <div id="appContain" style={{width: this.state.win[0]}} className={`relative ${newsActive?"inverse":""}`}>
            <Link to="/"><div className={`smallLogo ${((this.state.page !== "home" && this.state.page !=="news") || (this.state.infoActive  ) )?"activeLogo":""}`} data-page="home" onClick={this.goHome.bind(this)}>
                <img alt="willes-name" className={`fullWidth fullImg `} src={`/images/wordmark${mapActive?"-rust":''}.svg`} data-page="home"></img>
            </div></Link>
            {mobile?(
                <React.Fragment>
                    <div className={`tCTA ptSm pbSm tRight cPointer tUpper mobileButton tWhite ctaLink ${mapActive?"tRust":"tWhite"}`} onClick={this.checkMobileMenu.bind(this)}>{mobileMenu?"close":"menu"}
                      {this.state.cart.length?(
                        <div id="cartIcon" className="bgRust tWhite tBold mrSm relative" onClick={this.openCart.bind(this)}><p className="centeredContent tNumsSub">{this.state.cart.length}</p></div>
                        ):('')}
                    </div>                  
                 
                  <div className={`fullScreen mobileMenu bgBlue ${mobileMenu?"active":""}`}>
                    <div className="fullStage centeredContent tWhite tUpper pbHuge">
                      <Link to="/"><h2 data-page="home" onClick={this.goHome.bind(this)} className="tCenter mbSm homeLink" >home</h2></Link>
                      <Link to="/spirits"><h2 data-page="spirits" onClick={this.checkSection.bind(this)} className="tCenter mbSm spiritsLink" >spirits</h2></Link>    
                      <Link to="/vendors"><h2 data-page="vendors" onClick={this.checkSection.bind(this)} className="tCenter mbSm vendorsLink" >vendors</h2></Link>  
                      <Link to="/shop"><h2 data-page="shop" onClick={this.checkSection.bind(this)} className="tCenter mbSm shopLink">shop</h2></Link>
                      <Link to="/info"><h2 className="cPointer tCenter infoLink ctaLink">info</h2>  </Link>                
                    </div>
                  </div>
                </React.Fragment>
            ):(
            <div className={`nav ptSm pbSm  flex flexEnd col23 tUpper ${hideVen?"tRust":"tWhite"}`}>
                      {this.state.cart.length?(
                        <div id="cartIcon" className="bgRust tWhite tBold mrSm relative" onClick={this.openCart.bind(this)}><p className="centeredContent tNumsSub">{this.state.cart.length}</p></div>
                      ):('')}
               
              <Link to="/"><div data-page="home" onClick={this.goHome.bind(this)} className=" tRight homeLink" >home</div></Link>    
              <Link to="/spirits"><div data-page="spirits" onClick={this.checkSection.bind(this)} className=" tRight plSm spiritsLink" >spirits</div></Link>     
              <Link to="/vendors"><div data-page="vendors" onClick={this.checkSection.bind(this)} className="tRight plSm vendorsLink" >vendors</div></Link>      
              <Link to="/shop"><div data-page="shop" onClick={this.checkSection.bind(this)} className="tRight plSm shopLink" >shop</div></Link>
              <Link to="/info"><div className="plSm tRight cPointer infoLink ctaLink">info</div> </Link>                 
            </div>

            )}
             {newsActive?(    <Link to="/">
                              <div className="newsOff backBut">
                                <img alt="back-button" className="fullImg" src="/images/button-back.svg"></img>
                              </div>
                              </Link>
                            ):('')}

            <div className={`relative fullWidth ${newsActive?('newsAct'):('')} ${((infoActive) ?"condenseStage":"")}`} style={{minHeight:'100vh'}}>
            {(news.length && (this.state.page === "home" || this.state.page === "news"))?(
              <Link to="/news">
              <div className={`newsHold bgWhite ptMed`}>
                {!newsActive?(
                    <div className="newsAlert tUpper">
                        <div className=" centeredContent tWhite tCenter">
                            <p className="tCTA">{news[0].subTitle}</p>
                            <p className="tCTA">{this.getTime(news[0].date, true)}</p>
                          </div>
                        <img alt="icon-sticker" className="newsBorder fullWidth fullHeight spin" src="/images/icon-sticker.svg"></img>
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
                          <img alt="article" className="fullImg" src={news[0].media[0].url}></img>
                        ):('')}
                    </div>
                    <div className="col13">
                      <div className="fullWidth tBlue mbSm" dangerouslySetInnerHTML={{ __html : news[0].about }}></div>
                     <Link to="/rsvp">
                      <div className="rsvpNews relative pbHuge" ><div className="flex flexACenter fullWidth centeredContent plSm prSm" ><img alt="go-button" className="forwardBut"src="/images/button-forward-blue.svg"></img><div className="tCTA tBlue prSm plSm tCenter">RSVP</div></div></div>
                      </Link>
                    </div></div>

                </div>
                </div>
                <Route path='/news' render={()=><News checkSection={this.checkSection} clickNews={this.clickNews} closeNews={this.closeNews.bind(this)}/>} /> 

              </div>
              </Link>
            ):('')}
                <Route path='/checkout' render={()=><Checkout openRSVP={this.openRSVP} closeRSVP={this.closeRSVP} setCart={this.setCart} openCart={this.openCart} closeCart={this.closeCart} shipping={this.state.shipping} subTotal={this.state.subTotal} tax={this.state.tax} total={this.state.total} changeOpt={this.changeOpt} cart={this.state.cart} resizeWin={this.resizeWin} mobile={this.state.mobile} viewCart={this.state.viewCart} info={this.state.info[0]} win={this.state.win}/>} />          
                <Route path='/invoice' render={()=><Invoice openRSVP={this.openRSVP} closeRSVP={this.closeRSVP} getTime={this.getTime} resizeWin={this.resizeWin} checkSection={this.checkSection} mobile={this.state.mobile} infoActive={this.state.infoActive} info={this.state.info[0]} win={this.state.win}/>} /> 
                <Route path='/rsvp' render={()=><RSVP openRSVP={this.openRSVP} closeRSVP={this.closeRSVP} getTime={this.getTime} resizeWin={this.resizeWin} checkSection={this.checkSection} mobile={this.state.mobile} infoActive={this.state.infoActive} info={this.state.info[0]} win={this.state.win}/>} /> 
                <div className={`relative fullWidth ${((newsActive || rsvpActive) ?"condenseStage":"")}`} style={{minHeight:win[1]}}>
                <Switch>
                  <Route path='/vendors' render={()=><Vendors getImg={this.getImg} showVen={this.showVen} hideVen={this.state.hideVen} venToggle={this.venToggle} venOff={this.venOff} mapOff={this.mapOff} mapOn={this.mapOn} resizeWin={this.resizeWin} checkSection={this.checkSection} mobile={this.state.mobile} infoActive={this.state.infoActive} info={this.state.info} win={this.state.win}/>} /> 
                  <Route path='/shop' render={()=><Shop getImg={this.getImg} addCart={this.addCart} urlText={this.urlText} resizeWin={this.resizeWin} checkSection={this.checkSection} mobile={this.state.mobile} infoActive={this.state.infoActive} info={this.state.info} win={this.state.win}/>} /> 
                  <Route path='/spirits' render={()=><Spirits getImg={this.getImg} resizeWin={this.resizeWin} fadeIn={this.fadeIn} checkSection={this.checkSection} mobile={this.state.mobile} infoActive={this.state.infoActive} info={this.state.info} win={this.state.win}/>} /> 
                  <Route path='/' render={()=><Home resizeWin={this.resizeWin} checkSection={this.checkSection} info={this.state.info} win={this.state.win}/>} />

                </Switch>  
              </div>
              </div>
              <div className={`footerHold fullWidth relative ${mapActive && !mobileMenu?('mapActive'):("")} ${mobileMenu?('highMenu'):''}`} style={{height:"100%"}}>
                <div className="footer fullWidth ">
                  <div className="fullStage eCenter flex flexACenter bWhite bTopSm pbSm ptSm footerFlex">
                    <div className="col3 iconHold flex flexACenter">
                        <a className='col3' href="/admin/login"><img alt="icon-roxcrew" className="fullWidth" src={`/images/logo-roxcrew${newsActive?"-rust":""}.svg`}></img></a>
                      
                          <img alt="icon-services" className="col3" src={`/images/logo-service${newsActive?"-rust":""}.svg`}></img>
                      
                        <img alt="icon-ca-spirits" className="col3" src={`/images/logo-ca-spirits${newsActive?"-rust":""}.svg`}></img>
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
                      <img alt="icon-good-spirits" className="col23 eCenter" src="/images/logo-goodspirits.svg"></img>
                  </div>
                  <div className="textHold col2 eCenter ptLrg">
                  <div className="info mbHuge col23 eCenter tWhite tCenter" dangerouslySetInnerHTML={{ __html : info[0].about}}></div>
                  </div>
                 </div>
                 

                 <Route path='/info' render={()=><About checkSection={this.checkSection} checkInfo={this.checkInfo} closeInfo={this.closeInfo}/>} /> 

            </div>
        </div>
        </React.Fragment>             
      ):("")}
      
       </React.Fragment>
    
    );
  }
}

export default Main;
