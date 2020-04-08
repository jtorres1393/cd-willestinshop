import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './cart.css';


class Cart extends Component {
    constructor(){
        super();
        
        this.state = {
        }

    };

  
    render() {
        const {cart} = this.props;
        const {win} = this.props;
        const {viewCart} = this.props

    return (
      <React.Fragment>
    {cart.length?(
          <div id="cart" className={`ptLrg pbLrg bgWhite ${viewCart?('active'):('')}`} style={{width: win[0], maxHeight:win[1]}}>
            <div className="fullStage  ptMed eCenter tBlue relative">
                    <div onClick={this.props.closeCart} className="plSm pbSm tCTA tUpper cPointer hideCart">Hide Cart</div>
                    {cart.map((item, i)=>{
                        return(
                            <div className="fullWidth bBot bBlue bBotSm pbXs ptXs flex " key={`item-${i}`}>
                               <div className="col3 cartItemName">
                                   <p className="tNumsSub tUpper">{item.item.title}</p>
                                   <p className="tDetails tUpper">{item.item.subTitle}</p>
                                   
                                </div>
                                <div className="col23 flex cartOptionsHold">
                                    <div className="col3 cartOptionSelect relative selectFieldBlue bBlue ">
                                        <select name="option" data-id={i} className="fullWidth prXs ptXs plXs pbXs tUpper fullHeight" value={item.option} onChange={this.props.changeOpt.bind(this)}>
                                            {item.item.shopOptions.map((op,o)=>{
                                                return(
                                                    <React.Fragment key={`cart-item${i}-op-${o}`}>
                                                    {(op.stock > 0)?(
                                                       <option value={o} className="tUpper tCenter">{op.title}</option>
                                                    ):('')}
                                                   
                                                    </React.Fragment>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="col3 flex bBlue bSm fullHeight ">
                                        <div onClick={this.props.subIn.bind(this)} data-id={i} className="colThird bBlue relative ptSm cPointer" ><img data-id={i} alt="subtract-inventory" className="centeredContent" src="/images/ui-sub-blue.svg"/></div>
                                            <input data-id={i} key={`quantity-${item.quantity}-${i}`} className="colThird bBlue bRight bLeft tBold tBlue tCenter tNews" name="quantity" type="number" min="1" defaultValue={item.quantity} onChange={this.props.changeQ.bind(this)}></input>
                                        <div onClick={this.props.addIn.bind(this)} data-id={i} className="colThird relative ptSm cPointer" ><img alt="add-inventory" data-id={i} className="centeredContent" src="/images/ui-add-blue.svg"/></div>  
                                    </div>
                                    <div className="col3 flex fullHeight ">
                                        <div className="col2 relative"><p className="centeredContent fullWidth tNews tBold tRight">{`$${(item.item.shopOptions[item.option].cost*item.quantity/100).toFixed(2)}`}</p></div>
                                        <div onClick={this.props.removeItem.bind(this)} className="col2 relative cPointer"><img alt="delete-line" data-id={i} className="centeredContent" src="/images/ui-delete-blue.svg"/></div>
                                    </div>
                                   
                                </div>
                                 
                            </div>
                        )
                    })}
                    <div className="fullWidth ptSm flex flexDRev">
                       
                        <div className="col23 flex flexDRev cartTotal">
                            <div className="col3 flex">
                                <div className="col2">
                                <p className='fullWidth tUpper tRight tNews tBold'>${(this.props.subTotal/100).toFixed(2)}</p>
                                <p className='fullWidth tUpper tRight tNews tBold'>${(this.props.tax/100).toFixed(2)}</p>
                                <p className='fullWidth tUpper tRight mbSm tNews tBold'>${(this.props.shipping/100).toFixed(2)}</p>
                                <p className='fullWidth tUpper tRight tNews tBold'>${(this.props.total/100).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="col3">
                                <p className='fullWidth tUpper tRight tNews tBold'>Subtotal</p>
                                <p className='fullWidth tUpper tRight tNews tBold'>Tax</p>
                                <p className='fullWidth tUpper tRight mbSm tNews tBold'>Shipping</p>
                                <p className='fullWidth tUpper tRight tNews tBold' >Total</p>
                            </div>
                            
                            <div className="col3 flex">                                
                            </div>
                        </div>
                        <Link to="/checkout" className="col3 cartTotal" onClick={this.props.closeCart.bind(this)}>
                            <div className="fullWidth flex flexACenter">
                                <img alt="submit-button" className="col3 forwardBut checkBut"src="/images/button-forward-blue.svg"></img><button className="checkoutBut bgBlue tCenter col23 tNums tWhite formCell tUpper">Checkout</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
    ):('')}
       </React.Fragment>
    );

  }
}

export default Cart;
