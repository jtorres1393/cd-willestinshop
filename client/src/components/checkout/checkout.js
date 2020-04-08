import React, { Component } from 'react';
import './cart.css';
import Cleave from 'cleave.js/react';



class Checkout extends Component {
    constructor(){
        super();
        
        this.state = {
            success: false,
            error:false,
            message:"",
            processing: false
        }

    };

    componentDidMount(){
      this.props.openRSVP();
    }

    componentWillUnmount(){
      this.props.closeRSVP();
    }



  


    

 
    async submit(ev) {
        ev.preventDefault();
        this.setState({processing:true})
         let order={}
        let card={}
        order.firstName = ev.target.firstName.value;
        order.lastName = ev.target.lastName.value;
        order.address = ev.target.address.value;
        order.city = ev.target.city.value;
        order.state = ev.target.state.value;
        order.zip = ev.target.zip.value;
        order.cart = this.props.cart;
        order.total = this.props.subTotal;
        order.tax = this.props.tax;
        order.shipping=this.props.shipping;
        order.email = ev.target.email.value;


        card.num= ev.target.card.value;
        card.date = ev.target.date.value;
        card.cvv = ev.target.cvv.value;
        
        

        let response = await fetch(`/api/pay-order`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({order, card})
          }).catch(err=>{
            console.log(err)
          })
          if (response.status === 200){
            this.setState({success:true},()=>{
              let curr = [];
              this.props.setCart(curr)
            })
            console.log('great')
      
          }
          else if(response.status === 404){
            this.setState({processing:false, error:true, message:"Item Out of Stock"})
        
          }
          else if(response.status === 412){
            this.setState({processing:false, error:true, message:"Transaction Failed, Please Make Sure Your Info is Correct"})
        
          }
    
      }

  


    render() {
      const { cart } = this.props;
      const { processing } = this.state;
      const { error } = this.state; 
      const { success } = this.state;
      const {mobile} = this.props;
      const {win} = this.props;
      const {info} = this.props;
    return (
      <React.Fragment>
        <div className="fullScreen rsvpStage ptHuge" style={{minHeight:(mobile?(win[1]+200):(win[1]+150)), height:'auto'}}>
          <div className="rsvpSheet col23 eCenter bgWhite ptSm pbLrg plSm prSm scrollReveal relative">
          <div className="sealHold">
                <img alt="service-motto-seal" className="eCenter fullImg" src="/images/logo-service-blue.svg"></img>
          </div>
          <div className="invLogoHold fullWidth mtMed mbMed">
              <div className="invLogo eCenter">
                <img alt="willes-logo" className="eCenter fullImg" src="/images/logo-blue.svg"></img>
              </div>
          </div>
          <div className="fullWidth mbLrg">
                  <p className="tNews tCenter tBlue tUpper">{`${info.address} • ${info.city} ${info.state}`}</p>
                  <p className="tNews tCenter tBlue tUpper">{`${info.phone} • `} <a href={`mailto:${info.email}`}><span>{info.email}</span></a></p>
          </div>
                      
                      <div className={`bBlue bTopSm flex mbSm`} >
                        <h1 className="fullWidth tCenter tBlue"> ORDERS FOR PICK-UPS ONLY </h1>
                        <div className="colHalf bBlue bRight formCell bBotSm flex">
                          <p className="tNews tBlue pSmall tUpper tBold tCenter">Items</p>
                        </div>
                        <div className="colFourth formCell bRight bBotSm flex relative">
                          <p className="tNews tBlue pSmall tUpper tBold tCenter">#</p>          
                        </div>
                        <div className="colFourth formCell bBotSm flex relative">
                          <p className="tNews tBlue pSmall tUpper tBold tCenter">Cost</p>          
                        </div>
                
                        {cart.map((item,i)=>{
                            return(
                              <React.Fragment key={`cart-${i}`}>
                              <div className="colHalf bBlue bRight formCell bBotSm flex">
                              <p className="tNews tBlue tUpper  tCenter">{item.item.title}</p>
                              </div>
                              <div className="colFourth formCell bRight bBotSm flex relative">
                                <p className="tNews tBlue tUpper  tCenter">{item.quantity}</p>          
                              </div>
                              <div className="colFourth formCell bBotSm flex relative">
                                <p className="tNews tBlue tUpper  tCenter">${((item.item.shopOptions[item.option].cost)*item.quantity/100).toFixed(2)}</p>          
                              </div>
                              </React.Fragment>
                            )
                        })}
                        <div className="colHalf bBlue formCell flex totalBuff">
                        </div>
                        <div className="colFourth formCell  relative totalDes">
                          <p className="tNews tBlue tUpper tBold tRight fullWidth">Subtotal</p>
                          <p className="tNews tBlue tUpper tBold tRight">Tax</p>     
                          <p className="tNews tBlue tUpper tBold tRight">Shipping</p>  
                          <p className="tNews tBlue tUpper tBold tRight">Total</p>       
                        </div>
                        <div className="colFourth formCell relative">
                             <p className="tNews tBlue tLeft tUpper tBold ">${(this.props.subTotal/100).toFixed(2)}</p> 
                             <p className="tNews tBlue  tLeft tUpper tBold ">${(this.props.tax/100).toFixed(2)}</p> 
                             <p className="tNews tBlue tLeft tUpper tBold ">${(this.props.shipping/100).toFixed(2)}</p> 
                             <p className="tNews tBlue   tLeft tUpper tBold ">${(this.props.total/100).toFixed(2)}</p>      
                        </div>
                    </div>
          {success?(
            <React.Fragment>
            <div className="fullWidth ptLrg pbLrg">
                <h1 className="tCenter tRust"> Thank you for your business! </h1>
              </div>
              <div className="fullWidth tCenter paidInFull success">
                  <p className="rsvpTop tRust tUpper"> Paid </p>
               </div>
               </React.Fragment>
          ):('')}
          <form className={`fullWidth tBold tUpper bBlue bTopSm ${success?('success'):('')}`} onSubmit={this.submit.bind(this)}>
          <input className="checkoutInput colHalf bBlue formCell bRight bBotSm tUpper bLeft" name="firstName" type="text" placeholder="First name"required></input>
          <input className="checkoutInput colHalf bBot bBlack bBlue formCell bBotSm tUpper bRight" name="lastName" type="text" placeholder="Last name"required></input>
          <input className="checkoutInput fullWidth bLeft bBot bBlack bBlue formCell bBotSm tUpper bRight" name="email" type="text" placeholder="email"required></input>
          <input className="checkoutInput fullWidth bBot formCell  bBotSm tUpper bLeft bRight" name="address" type="text" placeholder="Billing address"required></input>
          <input className="checkoutInput colThird bBot formCell bRight bBotSm tUpper bLeft cityInput" name="city" type="text" placeholder="city"required></input>
          <select className="checkoutInput colThird bBot formCell bRight bBotSm tUpper stateInput" name="state" defaultValue="ca" required>
                <option value="al">al</option>
                <option value="ak">ak</option>
                <option value="ar">ar</option>
                <option value="az">az</option>
                <option value="ca">ca</option>
                <option value="co">co</option>
                <option value="ct">ct</option>
                <option value="dc">dc</option>
                <option value="de">de</option>
                <option value="fl">fl</option>
                <option value="ga">ga</option>
                <option value="hi">hi</option>
                <option value="ia">ia</option>
                <option value="id">id</option>
                <option value="il">il</option>
                <option value="in">in</option>
                <option value="ks">ks</option>
                <option value="ky">ky</option>
                <option value="la">la</option>
                <option value="ma">ma</option>
                <option value="md">md</option>
                <option value="me">me</option>
                <option value="mi">mi</option>
                <option value="mn">mn</option>
                <option value="mo">mo</option>
                <option value="ms">ms</option>
                <option value="mt">mt</option>
                <option value="nc">nc</option>
                <option value="ne">ne</option>
                <option value="nh">nh</option>
                <option value="nj">nj</option>
                <option value="nm">nm</option>
                <option value="nv">nv</option>
                <option value="ny">ny</option>
                <option value="nd">nd</option>
                <option value="oh">oh</option>
                <option value="ok">ok</option>
                <option value="or">or</option>
                <option value="pa">pa</option>
                <option value="ri">ri</option>
                <option value="sc">sc</option>
                <option value="sd">sd</option>
                <option value="tn">tn</option>
                <option value="tx">tx</option>
                <option value="ut">ut</option>
                <option value="vt">vt</option>
                <option value="va">va</option>
                <option value="wa">wa</option>
                <option value="wi">wi</option>
                <option value="wv">wv</option>
                <option value="wy">wy</option>
          </select>
           <input className="checkoutInput colThird bBot formCell bBotSm bRight zipInput" name="zip" type="text" placeholder="zip code"required></input>
           <Cleave className="checkoutInput fullWidth bBot formCell  bBotSm bRight ccCard bLeft" name="card" type="text" placeholder="Credit Card Number" options={{creditCard: true}} required/>

              <Cleave className="checkoutInput colHalf bBot formCell bBotSm bRight exDate bLeft" placeholder="MMYY" name="date" type="text" options={{date: true, datePattern: ['m', 'y']}}></Cleave>          
            <input className="checkoutInput colHalf bBot formCell  bBotSm bRight " name="cvv" type="text" placeholder="CVV"required></input>
            {processing?(''):(
                          <button className="bgBlue tWhite fullWidth formCell tUpper tNums" >pay total: {"$"+((this.props.total)/100).toFixed(2)}</button>

            )}
            {error?(
              <div className="fullWidth tCenter">
                  <p className="cThanks mtSm tRust">{this.state.message}</p>
              </div>
            ):('')}
            </form>
            </div>
            </div>
    
       </React.Fragment>
    );

  }
}

export default Checkout;
