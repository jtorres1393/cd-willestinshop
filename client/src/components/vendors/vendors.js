import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Route, Switch, Link} from 'react-router-dom';
import './vendors.css';
import WillesMark from './willesMark.js'
import VenMark from './venMark.js'
import BarMark from './barMark.js'
import Tip from './tip.js'




class Vendors extends Component {
    constructor(){
        super();
        this.map="";
        this.state = {
            data:[],
            bars:[],
            center:{lat:33.8191142,lng:-118.1780234},
            tipActive:false,
            curr:[],
            barActive:false

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
         data: data.data, bars:data.bars}));
      
    }
    

    genMarkers=()=>{
      let markers = []
      var data = this.state.data;
      data.forEach((el)=>{
          if (el.location.length){
            el.location.forEach((loc)=>{
              markers.push(
                <VenMark
                lat={loc.lat}
                lng={loc.long}
                />
                )
            })
          }
      })

      return markers


    }

    genBars=()=>{
      let markers = []
      var data = this.state.bars;
      data.forEach((el)=>{
          if (el.location.length){
            el.location.forEach((loc)=>{
              markers.push(
                <BarMark
                lat={loc.lat}
                lng={loc.long}
                />
                )
            })
          }
      })

      return markers


    }

    // menuClick=(e)=>{
    //  var id = parseInt(e.target.getAttribute('data-id'))
    //  var lat = parseFloat(e.target.getAttribute('data-lat'))
    //  var lng = parseFloat(e.target.getAttribute('data-lng'))
 
    // }

    moveMap=(lat,lng)=>{
      this.setState({center:{lat:lat,lng:lng}})
    }


    showTip=()=>{
      this.setState({tipActive:true})
    }

    barOn = ()=>{
      this.setState({barActive:true})
    }

    barOff = ()=>{
      this.setState({barActive:false})
    }
  


    render() {
        const {barActive} =this.state;
        const mapOptions = {
            styles: [
              {
                  "featureType": "administrative",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "color": "#2f456b"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#f2f2f2"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road",
                  "elementType": "all",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "lightness": 45
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "simplified"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#2f456b"
                      },
                      {
                          "visibility": "on"
                      }
                  ]
              }
          ]
        };
      const { win } = this.props;
      const { data } = this.state;
      const {bars} = this.state;
      const {tipActive} = this.state;
    

      const defaultProps = {
        center: {
          lat: 33.8191142,
          lng:  -118.1780234
        },
        zoom: 15
      }
    
    return (
      <React.Fragment>
            <div className="typeHold flex">
              <Link className="col2" to="/vendors">
                <div className={`typeBut fullWidth ${barActive?"bgWhite tRust":'active bgRust tWhite'}`} onClick={this.barOff}><p className="tCenter tCTA">Stores</p> </div>
              </Link>
              <Link className="col2" to="/vendors">
                <div className={`typeBut fullWidth ${barActive?"active bgBlue tWhite":'bgWhite tBlue'}`} onClick={this.barOn}><p className="tCenter tCTA">Bars</p> </div>
              </Link>
            </div>
            <Route path='/vendors/*' render={()=><Tip  moveMap={this.moveMap} showTip={this.showTip} tipActive={this.state.tipActive} win={this.state.win}/>} />
            

        <div className={`venMenu ${tipActive?"active":''} ${barActive?"bgBlue":'bgRust'}`}>
            <div className="venHold fullWidth fullHeight">
              {barActive?(
                    bars.map((co,i)=>{
                      return(
                        
                        <div className="singleVend tWhite pbSm bBot bWhite bBotSm ptSm" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >
                          <Link className="fullWidth" to={`/vendors/${co.slug}?loc=1`}>
                          <p className="tCTA fullWidth mbXs" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >{co.name}</p>
                          </Link>
                          <div className="fullWidth flex" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >
                                {co.location.map((loc, l)=>{
                                  return(
                                    <Link className="fullWidth" to={`/vendors/${co.slug}?loc=${l+1}`}>
                                  <div className="col2 tDetails tLeft tUpper fullWidth" data-lat={loc.lat} data-lng={loc.long} data-id={loc.id} >{loc.city} {loc.state}</div>
                                  </Link>
                                  )
                                })}
                          </div>
                        </div>
                      

                      )})
              ):(

                      data.map((co,i)=>{
                        return(
                          
                          <div className="singleVend tWhite pbSm bBot bWhite bBotSm ptSm" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >
                            <Link className="fullWidth" to={`/vendors/${co.slug}?loc=1`}>
                            <p className="tCTA fullWidth mbXs" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >{co.name}</p>
                            </Link>
                            <div className="fullWidth flex" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >
                                  {co.location.map((loc, l)=>{
                                    return(
                                      <Link className="fullWidth" to={`/vendors/${co.slug}?loc=${l+1}`}>
                                    <div className="col2 tDetails tLeft tUpper fullWidth" data-lat={loc.lat} data-lng={loc.long} data-id={loc.id} >{loc.city} {loc.state}</div>
                                    </Link>
                                    )
                                  })}
                            </div>
                          </div>
                        

                        )
                      })
              )}
              
              </div>
          </div>
        
         {data.length ?(
        <div className="fullScreen bgBlue" style={{height: win[1]*1.2}}>
            
      <div className="eCenter" style={{ height: '100%', width: '100vw', borderRadius:'30px' }}>
          <GoogleMapReact
            ref={element => this.map = element}
            options={mapOptions}
            bootstrapURLKeys={{ key:'AIzaSyA78c2xkqLH7g28LNngLhvfaY5rkDpMydA'}}
            defaultCenter={defaultProps.center}
            center={this.state.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            {barActive?(
                 this.genBars()
            ):(
              this.genMarkers()
            )}
            
           
            <WillesMark 
                lat='33.8191142'
                lng='-118.1780234'
                />

          </GoogleMapReact>
      </div>
        </div>
         ):
         ('loading')}
    </React.Fragment>
    );
  }
}

export default Vendors;
