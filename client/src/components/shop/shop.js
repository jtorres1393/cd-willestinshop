import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Products from './products.js';
import SingleProduct from './singleProduct.js';
import './shop.css';


class Shop extends Component {
    constructor(){
        super();
        
        this.state = {
          cat:[],
          single:false,
          active: false,
          bg:""
           

        }

    };

    componentDidMount(){
      this.props.checkSection();
      this.getData();
      
    }
    

    singleMode=()=>{
      this.setState({single:true})
    }

    singleOff=()=>{
      this.setState({single:false})
    }

    getData = () => {
      fetch(('/api/shop'))
      .then(res => res.json())
      .then(data => this.setState({
          cat: data.data}));

    }

    shopToggle=()=>{
      this.setState({active:!this.state.active})
    }

    changeBG=(color)=>{
      this.setState({bg:color})
    }

  


    render() {
      const { win } = this.props;
      const { cat } = this.state;
      const {single} = this.state;
      const {mobile} = this.props;
      const {active} = this.state;
      const {bg} = this.state;

    return (
    
      <div className={`fullScreen shopBG tWhite ${bg?`bg${bg}`:`bgRust`}`} style={{minHeight: win[1]}}>
        <div className="shopStage fullStage eCenter flex ptHuge">
        {cat.length?(
          <React.Fragment>
            {mobile?(
                <div onClick={this.shopToggle.bind(this)} className={`catBut ptXs pbXs col23 cPointer ${active?"bgWhite tRust":'bgRust tWhite'}`}><p className="tCenter tCTA tUpper">Categories</p> </div>

            ):('')}
              <div className={`shopMenu shopBG col4 ptMed ${single?('hide'):('')} ${mobile?'mobile':''} ${active?'active':''} ${bg?`bg${bg}`:`bgRust`}`}>
              {cat.map((item, i)=>{
                return(
                  <div key={`cat-item-${i}`} className={`cat${item.title} mbSm catBlock`}>
                    <Link onClick={this.shopToggle} to={`/shop/${((item.shopItems.length !== 1 )?(`${item.title}`):(`${item.title}/${this.props.urlText(item.shopItems[0].title)}`))}`}>
                      <p className="tNews tBold tUpper">{item.title}</p>
                    </Link>
                    {item.shopItems.length > 1?(
                        item.shopItems.map((shopI, s)=>{
                          return(
                            <div key={`cat-products-${s}`}className="mtXs">
                              <Link onClick={this.shopToggle} to={`/shop/${item.title}/${this.props.urlText(shopI.title)}`}>
                                <p className="tDetails tUpper">{shopI.title}</p>
                                </Link>
                              </div>
                              
                          )
                        })
                    ):('')}
                  </div>
                )
              })}
          </div>
          <div className={`col34 productStage ptMed ${single?('singleActive'):('')}`}> 
                  <Switch>
                    <Route path='/shop/*/*' render={()=><SingleProduct  changeBG={this.changeBG} getImg={this.props.getImg} addCart={this.props.addCart} singleMode={this.singleMode} singleOff={this.singleOff} urlText={this.props.urlText} checkSection={this.props.checkSection} info={this.props.info} win={this.props.win}/>} />
                    <Route path='/shop' render={()=><Products  getImg={this.props.getImg} urlText={this.props.urlText} checkSection={this.props.checkSection} info={this.props.info} win={this.props.win}/>} />
                  </Switch>
          </div>
            </React.Fragment>
        ):("")}
      </div>
       </div>
    
    );
  }
}

export default Shop;
