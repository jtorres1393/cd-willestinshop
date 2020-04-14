import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class SingleProduct extends Component {
    constructor(){
        super();
        
        this.state = {
          pro:[],
          current:'',
          currSec:'',
          added:false,
          option: 0,
          total: 0
          
        }

    };

    componentDidMount(){
      this.getData();
      this.props.singleMode();
    }

    componentWillUnmount(){
      this.props.singleOff();
      this.props.changeBG("")
    }
    
    componentWillUpdate(){
      var curr = window.location.href
      var currSec = curr.split('/')[5]
      if((currSec).toLowerCase() !== (this.state.currSec.toLowerCase())){
        window.scrollTo(0, 0)
        this.getData();
      }
      
    }


    addItem = ()=>{
      const el = document.getElementById('singleQuantity');
      if(el){
      var limit = this.state.pro[0].shopOptions[this.state.option].limit;
      if(!limit){
        limit = 99;
      }
        if(el.value < limit){
        el.value ++
        }
      }
      this.calcTotal();
      
    }

    subItem = ()=>{
      const el = document.getElementById('singleQuantity');
      if(el && el.value > 1){
        el.value -= 1
      }
      this.calcTotal();
    }
    newTotal = ()=>{
      const option = document.getElementById('singleOption');
      this.setState({option: parseInt(option.value)},()=>{
        const el = document.getElementById('singleQuantity');
        el.value=1;
        this.calcTotal();
      })
    }
    calcTotal=()=>{
      if(this.state.added){
        this.setState({added:false})
      }
      const el = document.getElementById('singleQuantity');
      var num = el.value
      var total = num * this.state.pro[0].shopOptions[this.state.option].cost
      total = total.toFixed(2)
      this.setState({total: total})
    }

    getData = () => {
      var curr = window.location.href
      var currSec = curr.split('/')[5]
      fetch((`/api/product?id=${currSec}`))
      .then(res => res.json())
      .then(data => this.setState({
          pro: data.data, currSec: currSec, option: 0, total: 0, added:false},()=>{
            var total = 0;
            const el = document.getElementById('singleQuantity');
            el.value = 1;
            
            if(this.state.pro.length){
              if(this.state.pro[0].bg){
                this.props.changeBG(this.state.pro[0].bg)
              }
              if (this.state.pro[0].shopOptions.length){
                total = this.state.pro[0].shopOptions[0].cost
              }
            }
            this.setState({current: this.state.pro[0].title, total:total})
          }));

    }
  
    submit=(e)=>{
      e.preventDefault();
      this.setState({added:true})
      let order = {}
      let quantity = 0
      order.item = this.state.pro[0]
      order.option = e.target.option.value
      order.quantity =  e.target.quantity.value
      this.props.addCart(order)
    }

    render() {
    
      const { pro } = this.state;
      const {added} = this.state;
      const {option} = this.state;

    return (
    
      <div className="fullWidth flex singleProductStage relative pbStart flexAStart">
        
        {pro.length?(
          <React.Fragment>
              <div className="col4 tCenter singleProInfo">
                <div className="productInfoHold mbSm ">
                  <p className="tUpper tHeroSub mbSm fullWidth">{pro[0].title}</p>
                  <p className="singleDetails fullWidth tDetails tUpper">{pro[0].details}</p>
                </div>
                <form className="productCTA fullWidth flex" onChange={this.newTotal.bind(this)} onSubmit={this.submit.bind(this)}> 
                  {pro[0].type==="spirit"?(
                    <div className="fullWidth flex flexACenter tUpper mbSm">
                        <div className="tCenter plXs">
                          <p className="tBold tUpper">{pro[0].proof}</p>
                          <p className="tDetails tBold spiritDeets">proof</p>
                        </div>
                        <div className="onStage" style={{transitionDelay:".3s"}}>
                          <p className="tNameSub">{pro[0].subTitle}</p></div>
                        <div className="onStage" style={{transitionDelay:".6s"}}>
                          <p className="tBold tUpper">{pro[0].alcvol/100}%</p>
                          <p className="tDetails tUpper tBold spiritDeets">alc/vol</p>
                        </div>
                      </div>
                  ):('')}
                  {(pro[0].notice)?(
                      
                      <div className="fullWidth mbSm"><p className="blink tNums">******</p><p className="fullWidth tUpper tDetails">{pro[0].notice}</p></div>
                      
                   ):('')}
                  {(parseInt(this.state.pro[0].shopOptions[this.state.option].limit)>0)?(
                     <div className="fullWidth mbSm"><p className="tNumsSub fullWidth tUpper">Limit {parseInt(this.state.pro[0].shopOptions[this.state.option].limit)} per Person</p></div>
                  ):('')}
              
                  <div className="fullWidth optionHold flex bWhite flexACenter mbXs">
                    <div className="fullWidth selectField relative">
                    <select id="singleOption" name="option" className="fullWidth tCenter tBold tWhite plXs ptXs prXs pbXs tUpper">
                      {pro[0].shopOptions?(
                        pro[0].shopOptions.map((option,o)=>{
                          return(<React.Fragment key={`itemOption-${o}`}>
                            {(option.stock > 0)?(
                               <option value={o} className="tUpper tNews tCenter">{option.title}</option>
                            ):('')}
                           
                            </React.Fragment>
                          )
                        })
                      ):('All Sold Out')}
                    </select></div>
                    </div>
                    <div className="optionHold fullWidth flex mbXs">
                        <div className="colThird bWhite relative ptSm" onClick={this.subItem.bind(this)}><img alt="subtract-inventory" className="fullHeight centeredContent" src="/images/ui-sub.svg"/></div>
                        <input id="singleQuantity" className="tNews colThird bWhite bRight bLeft tBold tWhite tCenter tNameSub" name="quantity" type="number" min="1" defaultValue="1" max={(pro[0].shopOptions[this.state.option].limit?(pro[0].shopOptions[this.state.option].limit):("200"))}></input>
                        <div className="colThird relative ptSm" onClick={this.addItem.bind(this)}><img alt="add-inventory" className="centeredContent" src="/images/ui-add.svg"/></div>
                        
                    </div>
                    {added?(
                      <Link to="/checkout" className="fullWidth">
                      <button className="bgWhite tNums fullWidth proCTA tUpper tBlue"> {`Checkout: $${(this.state.total/100).toFixed(2)}`}</button>
                      </Link>
                    ):(
                      <input type="submit" value={`ADD TO CART: $${(this.state.total/100).toFixed(2)}`} className="bgWhite tNums fullWidth proCTA tUpper"></input>

                    )}
                   
                </form>

              </div>
              <div className="col2 singleGalleryHold">
              {pro[0].media.length?(
                   pro[0].media.map((img,i)=>{
                    return(
                      
                      <img key={`product-photo-${i}`} alt="product-photos" className="mbSm fullImg singleProductImg" src={this.props.getImg(img.name)} />
                    )
                   })
                ):('no images found')}
              </div>
              <div className="col4 singleProductBuff">
                
              </div>
            </React.Fragment>
        ):("")}
       </div>
    
    );
  }
}

export default SingleProduct;
