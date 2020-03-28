import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './vendors.css';


class Vendors extends Component {
    constructor(){
        super();
        
        this.state = {
            data:[]

        }

    };

    componentDidMount(){
      this.props.checkSection();
      this.getData();
      
    }

    getData=()=>{
      
      fetch(('/api/vendors?type=store'))
      .then(res => res.json())
      .then(data => this.setState({
         data: data.data}));
      
    }
    

    genMarkers=()=>{
      let markers = []
      var data = this.state.data;
      data.forEach((el)=>{
          if (el.location.length){
            el.location.forEach((loc)=>{
              markers.push(
                <div id={loc.id} className="bgRust tWhite mapMarker"
                lat={loc.lat}
                lng={loc.long}
                ><p className="centeredContent">{el.name}</p></div>
                )
            })
          }
      })

      return markers


    }
 


  


    render() {
      const { win } = this.props;
      const { data } = this.state;

      const defaultProps = {
        center: {
          lat: 33.8191142,
          lng:  -118.1780234
        },
        zoom: 16
      }
    
    return (
      <React.Fragment>
         {data.length ?(
           <React.Fragment>
          <div className="venMenu bgBlue">
            <div className="venHold fullWidth fullHeight">
              {data.map((loc,i)=>{
                return(

                  <div className="signleVend tWhite pbSm bBot bWhite bBotSm ptSm">
                    <h1>{loc.name}</h1>
                    <a href=""><p className="tNews">{loc.web}</p></a>
                  </div>

                )
              })}
              </div>
          </div>
      <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key:'AIzaSyA78c2xkqLH7g28LNngLhvfaY5rkDpMydA'}}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {this.genMarkers()}

          </GoogleMapReact>
    </div>
    </React.Fragment>
         ):
         ('loading')}
      </React.Fragment>
    );
  }
}

export default Vendors;
