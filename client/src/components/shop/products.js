import React, { Component } from 'react';
import { Link} from 'react-router-dom';


class Products extends Component {
    constructor(){
        super();
        
        this.state = {
          cat:[],
          current:""
           

        }

    };

    componentDidMount(){
      this.getData();
      
    }
    
    componentWillUpdate(){
      var curr = window.location.href
      var currSec = curr.split('/')[4]
      if(!currSec){
        currSec = "spirits"
      }
      if((currSec).toLowerCase() !== (this.state.current.toLowerCase())){
        this.getData();
      }
      
    }

    getData = () => {
      var curr = window.location.href
      var currSec = curr.split('/')[4]
      if (!currSec){
        currSec = 'spirits'
      }
      fetch((`/api/shopPro?category=${currSec}`))
      .then(res => res.json())
      .then(data => this.setState({
          cat: data.data},()=>{
            this.setState({current: this.state.cat[0].title})
          }));

    }
  


    render() {
      const { win } = this.props;
      const { cat } = this.state;
      const {urlText} = this.props;

    return (
    
      <div className="fullWidth flex pbStart">
        
        {cat.length?(
          <React.Fragment>
          {cat[0].shopItems.length?(
            cat[0].shopItems.map((item,i)=>{
              return(
                <Link key={`shop-${item.title}`}className="productSingle col3" to={`/shop/${urlText(cat[0].title)}/${urlText(item.title)}`}>
                <div className=" fullWidth mbSm">
                  {item.media.length?(
                      <img alt={item.name} className="fullImg" src={this.props.getImg(item.media[0].name)} /> 
                  ):('')}
                    

                </div>
                </Link>
              )
            }) ):("")}
            </React.Fragment>
        ):("")}
       </div>
    
    );
  }
}

export default Products;
