import React, { Component } from 'react';
import './rsvp.css';



class RSVP extends Component {
    constructor(){
        super();
        
        this.state = {
            data: [],
            success: false

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
      fetch(('/api/rsvp'))
      .then(res => res.json())
      .then(data => this.setState({
          data: data.data
          }))

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
    return (
      <React.Fragment>
    {data.length?(
            <div className="fullScreen rsvpStage ptHuge" style={{minHeight:(mobile?(win[1]+200):(win[1]+150)), height:'auto'}}>
              <div className="rsvpSheet col23 eCenter bgWhite ptSm pbLrg plSm prSm scrollReveal">
                <div className="fullWidth mbMed">
                  <p className="fullWidth tBlue tUpper rsvpTop tCenter mbMed">rsvp</p>
                  <p className="tCenter tUpper tBlue tHeroSub">{data[0].subTitle}</p>
                  <p className="tNews tCenter tBlue tUpper mbMed">{this.props.getTime(data[0].date)}</p>
                  <p className="tNews tCenter tBlue tUpper">{`${info.address}, ${info.city} ${info.state}`}</p>
                  <p className="tNews tCenter tBlue tUpper">{`${info.phone}`}</p>
                </div>
                <div className="formHold bBlue bTopSm bBotSm relative">
                    {success?(
                      <div className="success message tCenter tBlue centeredContent fullWidth">
                          <p className="tThanks tUpper mbSm">{this.rsvp.firstName}</p>
                          <p className="mbSm tNews fullWidth">Thank you for your RSVP. We look forward to seeing you.</p>
                          <p className="mbSm tNews fullWidth"> Kindest regards, Wille’s Tin Shop</p>
                      </div>
                    ):('')}
                    <form className={`bBlue bTopSm bBotSm flex ${success?"hide":""}`} onSubmit={this.submit.bind(this)}>
                        <div className="colTwoThirds bBlue bRight formCell bBotSm flex">
                            <input className="fullWidth" placeholder="FIRST NAME" type="text" required name="firstName">
                            </input></div>
                            <div className="colThird formCell bBotSm flex relative selectAfter">
                                  <p className="tNews tBlue pSmall">GUESTS:</p>
                                  <select name="guests" className="plSm guestSelect">
                                      <option value="1"> 1 </option>
                                      <option value="2"> 2 </option>
                                      <option value="3"> 3 </option>
                                      <option value="4"> 4 </option>
                                      <option value="5"> 5 </option>
                                      
                                  </select>
                            </div>
                        <div className="colTwoThirds bBlue bRight formCell bBotSm">
                            <input placeholder="LAST NAME" type="text" required name="lastName"></input>
                          </div>
                          <div className="colThird formCell bBotSm"></div>
                        <div className="colTwoThirds bBlue bRight formCell bBotSm">
                            <input placeholder="EMAIL" type="email" required name="email"></input>
                            </div><div className="colThird formCell bBotSm"></div>
                        <div className="colTwoThirds bBlue bRight formCell"><input placeholder="PHONE" type="phone" required name="phone"></input></div><button className="submit colThird relative" type="submit" ><div className="flex rsvpSubHold flexACenter fullWidth centeredContent plSm prSm" ><img className="forwardBut"src="/images/button-forward-blue.svg"></img><div className="tCTA tBlue prSm plSm tCenter">RSVP</div></div></button>
                      </form>
                  
                </div>

              </div>

           </div>
    ):('')}
  
       </React.Fragment>
    );

  }
}

export default RSVP;
