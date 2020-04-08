import React, { Component } from 'react';
import './invoice.css';
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
      console.log(this.props.data)
    }

  


    

 
    async submit(ev) {
        ev.preventDefault();
        this.setState({processing:true})
         let bill={}
        let card={}
        bill.id = this.props.data[0].id;
        bill.firstName = ev.target.firstName.value;
        bill.lastName = ev.target.lastName.value;
        bill.address = ev.target.address.value;
        bill.city = ev.target.city.value;
        bill.state = ev.target.state.value;
        bill.zip = ev.target.zip.value;
        bill.cart = this.props.data[0].cart
        bill.grand = this.props.grand
        bill.email = this.props.data[0].buyer[0].email;


        card.num= ev.target.card.rawValue;
        card.date = ev.target.date.value;
        card.cvv = ev.target.cvv.value;
        
        

        let response = await fetch(`/api/pay-invoice?id=${this.props.data[0].id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({bill, card})
          }).catch(err=>{
            console.log(err)
          })
          console.log(response)
          if (response.status === 200){
            this.setState({success:true})
            console.log('great')
      
          }
          else if(response.status === 412){
            console.log('bad')
            this.setState({processing:false, error:true})
        
          }
    
      }

  


    render() {
      const { data } = this.props;
      const { processing } = this.state;
      const { error } = this.state; 
      const { success } = this.state;
    return (
      <React.Fragment>
    {data.length?(
          <React.Fragment>
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
          <form className={`fullWidth tBold tUpper ${success?('success'):('')}`} onSubmit={this.submit.bind(this)}>
          <input className="checkoutInput colHalf bBlue formCell bRight bBotSm tUpper bLeft" name="firstName" type="text" placeholder="First name"required></input>
          <input className="checkoutInput colHalf bBot bBlack bBlue formCell bBotSm tUpper bRight" name="lastName" type="text" placeholder="Last name"required></input>
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

              <Cleave className="checkoutInput colHalf bBot formCell bBotSm bRight exDate bLeft" placeHolder="MMYY" name="date" type="text" options={{date: true, datePattern: ['m', 'y']}}></Cleave>          
            <input className="checkoutInput colHalf bBot formCell  bBotSm bRight " name="cvv" type="text" placeholder="CVV"required></input>
            {processing?(''):(
                          <button className="bgBlue tWhite fullWidth formCell tUpper tNums" >pay total: {"$"+((this.props.grand)/100).toFixed(2)}</button>

            )}
            {error?(
              <div className="fullWidth tCenter">
                  <p className="cThanks mtSm tRust">Transaction Failed, Please Make Sure Your Info is Correct</p>
              </div>
            ):('')}
            </form>
            </React.Fragment>
    ):('')}
       </React.Fragment>
    );

  }
}

export default Checkout;
