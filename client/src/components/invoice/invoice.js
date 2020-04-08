import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './invoice.css';
import Checkout from './checkout.js';



class Invoice extends Component {
    constructor(){
        super();
        
        this.state = {
            data: [],
            success: false,
            total:0,
            grand:0,
            tax:0,
            shipping:0,
            cart:[]

        }

    };

    componentDidMount(){
      this.props.checkSection();
      this.props.openRSVP();
      this.getData();
      
    }

    componentWillUnmount(){
      this.props.closeRSVP();
    }


    getData = () => {
      var url = new URL(window.location.href);
      var id = url.searchParams.get('id')
      if(id){
      fetch((`/api/invoices?id=${id}`))
      .then(res => res.json())
      .then(data => this.setState({
          data: data.data
          },()=>{
            this.setState({shipping:parseInt(this.state.data[0].shipping), cart: JSON.parse(this.state.data[0].cart), tax:this.state.data[0].tax},()=>{
              this.getTotal()
            })
          }))
      }
    }
    
    getTotal=()=>{
      var total= 0;
      (this.state.cart).forEach((e)=>{
          var cost = e.cost*e.quantity
          total = total+cost
      })
      this.setState({total: total},()=>{
          this.getTax();
      })
  }

  getTax=()=>{
    var tax = (parseFloat(this.state.tax)/10000)*(this.state.total)
    this.setState({tax: tax},()=>{
        this.getGrand();
    })
}

getGrand=()=>{
  var grand = this.state.total + this.state.tax + this.state.shipping;
  this.setState({grand: grand})
  
}

 
    async submit(ev) {
        ev.preventDefault();
        this.setState({process:true})
        this.rsvp={}
    
        this.rsvp.firstName = ev.target.firstName.value;
        this.rsvp.lastName = ev.target.lastName.value;
        this.rsvp.email = ev.target.email.value;
        this.rsvp.phone = ev.target.phone.value;
        this.rsvp.guests = ev.target.guests.value;
        let rsvp = this.rsvp

        let response = await fetch(`/api/rsvp-submit?id=${this.state.data[0].id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({rsvp})
          }).catch(err=>{
            console.log(err)
          })
          if (response.ok){
      
            this.setState({success:true});
            // this.props.completeOrder();
            // this.props.setCart([]);
            console.log('great')
      
          }
          else if(response.status === 412){
            console.log('bad')
            // this.setState({error:true, message: "sorry, out of stock"})
            // this.props.completeOrder();
            // this.props.setCart([])
          }
    
      }

  


    render() {
      const { info } = this.props;
      const { win } = this.props;
      const { mobile } = this.props;
      const { data } = this.state;
      const { success } = this.state;
      const { cart } = this.state;
    return (
      <React.Fragment>
    {data.length?(
            <div className="fullScreen rsvpStage ptHuge" style={{minHeight:(mobile?(win[1]+200):(win[1]+150)), height:'auto'}}>
              <div className="rsvpSheet col23 eCenter bgWhite ptSm pbLrg plSm prSm scrollReveal relative">
                <div className="invoiceNumber">
                  <p className="tDetails tBold tBlue tUpper">invoice# {data[0].id}</p>
                </div>
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
                <div className="fullWidth cosInfo flex mbLrg">
                    <div className="colThird">
                    <p className="tBold tNews tRight prSm tBlue">SOLD TO:</p>
                    </div>
                    <div className="colTwoThirds">
                        <div>
                        <div className="fullWidth bBlue bBotSm">
                          <p className="tNews tUpper tBlue ">{data[0].buyer[0].firstName?(`${data[0].buyer[0].firstName} ${data[0].buyer[0].lastName} `):"" }
                          </p>
                        </div>
                          {data[0].buyer[0].company?(
                                <div className=" fullWidth bBlue bBotSm"><p className="tNews tUpper tBlue tBold">{data[0].buyer[0].company}</p></div>
                              ):("")}
                          
                              
                              {data[0].buyer[0].address?(
                                <p className="tNews tUpper tBlue">{data[0].buyer[0].address}</p>
                              ):("")}
                              {(data[0].buyer[0].city || data[0].buyer[0].state || data[0].buyer[0].zip)?(
                                <p className="tNews tUpper tBlue">
                                        {data[0].buyer[0].city?(
                                        <span>{data[0].buyer[0].city}</span>
                                        ):("")}
                                        {data[0].buyer[0].state?(
                                        <span>, {data[0].buyer[0].state}</span>
                                        ):("")}
                                        {data[0].buyer[0].zip?(
                                        <span > {data[0].buyer[0].zip}</span>
                                        ):("")}
                                </p>
                              ):("")}
                            
                      
                          
                        </div>
                    </div>
                </div>
                <div className="formHold bBlue bTopSm bBotSm relative">
                    
                    <div className={`bBlue bTopSm bBotSm flex ${success?"hide":""}`} >
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
                              <React.Fragment>
                              <div className="colHalf bBlue bRight formCell bBotSm flex">
                              <p className="tNews tBlue tUpper  tCenter">{item.item}</p>
                              </div>
                              <div className="colFourth formCell bRight bBotSm flex relative">
                                <p className="tNews tBlue tUpper  tCenter">{item.quantity}</p>          
                              </div>
                              <div className="colFourth formCell bBotSm flex relative">
                                <p className="tNews tBlue tUpper  tCenter">{(item.cost/100).toFixed(2)}</p>          
                              </div>
                              </React.Fragment>
                            )
                        })}
                        <div className="colHalf bBlue bRight formCell bRight bBotSm flex totalBuff">
                        </div>
                        <div className="colFourth formCell bRight bBotSm relative totalDes">
                          <p className="tNews tBlue tUpper tBold tRight fullWidth">Subtotal</p>
                          <p className="tNews tBlue tUpper tBold tRight">Tax</p>     
                          <p className="tNews tBlue tUpper tBold tRight">Shipping</p>  
                          <p className="tNews tBlue tUpper tBold tRight">Total</p>       
                        </div>
                        <div className="colFourth formCell bBotSm relative">
                             <p className="tNews tBlue tLeft tUpper tBold ">{(this.state.total/100).toFixed(2)}</p> 
                             <p className="tNews tBlue  tLeft tUpper tBold ">{(this.state.tax/100).toFixed(2)}</p> 
                             <p className="tNews tBlue tLeft tUpper tBold ">{(this.state.shipping/100).toFixed(2)}</p> 
                             <p className="tNews tBlue   tLeft tUpper tBold ">{(this.state.grand/100).toFixed(2)}</p>      
                        </div>

              
                        
                        
                        
                            
                        <div className="fullWidth bBlue">
                          {data[0].status==="paid"?(
                            <div className="fullWidth tCenter paidInFull">
                                <p className="rsvpTop tRust tUpper"> Paid </p>
                            </div>
                          ):(
                               <Link className="submit fullWidth flex" to={`/invoice/checkout?id=${data[0].id}`}>
                                 <div className="colFourth"></div>
                                  <img alt="submit-button" className="colFourth forwardBut"src="/images/button-forward-blue.svg"></img><button className="checkoutBut bgBlue tCenter colHalf tNums tWhite formCell tUpper">Checkout</button>
    
                                 </Link>
                          )}
                         

                          </div>
                      </div>
                  
                </div>
                <div className="tNews">
                  <Route path='/invoice/checkout' render={()=><Checkout grand={this.state.grand} data={this.state.data}/>} /> 

                </div>

              </div>

           </div>
    ):('')}
  
       </React.Fragment>
    );

  }
}

export default Invoice;
