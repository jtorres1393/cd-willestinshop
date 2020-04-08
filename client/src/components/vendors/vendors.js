import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Route, Link} from 'react-router-dom';
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
            barActive:false,
            hideVen: false

        }

    };

    componentDidMount(){
      this.props.checkSection();
      this.getData();
      
    }

    componentWillUnmount(){
      this.props.mapOff();
      this.props.venOff();
    }

    getData=()=>{
      
      fetch(('/api/vendors?type=store'))
      .then(res => res.json())
      .then(data => this.setState({
         data: data.data, bars:data.bars},()=>{
          this.props.mapOn();
         }));
      
    }
    

    genMarkers=()=>{
      let markers = []
      var data = this.state.data;
      data.forEach((el,e)=>{
          if (el.location.length){
            el.location.forEach((loc, i)=>{
              markers.push(
                
                <VenMark key={`marker-${e}${i}`}
                lat={loc.lat}
                slug={el.slug}
                loc={i+1}
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
            el.location.forEach((loc,i)=>{
              markers.push(
                <BarMark
                lat={loc.lat}
                lng={loc.long}
                slug={el.slug}
                loc={i+1}
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
      this.setState({center:{lat:lat*.9999,lng:lng*.99985}})
    }


    showTip=()=>{
      this.setState({tipActive:true})
    }
    hideTip=()=>{
      this.setState({tipActive:false})
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
          ],
          zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false
          
        };
      const { win } = this.props;
      const { data } = this.state;
      const {bars} = this.state;
      const {tipActive} = this.state;
      const {hideVen} = this.props;
    

      const defaultProps = {
        center: {
          lat: 33.8191142,
          lng:  -118.1780234
        },
        zoom: 14
      }
    
    return (
      <React.Fragment>
   
        <div className="fullWidth relative" style={{height: win[1]}}>
            <div className="typeHold flex">
              <Link className="col2" to="/vendors">
                <div className={`typeBut fullWidth ${barActive?"bgWhite tRust":'active bgRust tWhite'}`} onClick={this.barOff}><p className="tCenter tCTA">Stores</p> </div>
              </Link>
              <Link className="col2" to="/vendors">
                <div className={`typeBut fullWidth ${barActive?"active bgBlue tWhite":'bgWhite tBlue'}`} onClick={this.barOn}><p className="tCenter tCTA">Bars</p> </div>
              </Link>
            </div>
        
            

        <div className={`venMenu ${tipActive?"active":''} ${barActive?"bgBlue":'bgRust'} ${hideVen?"hideInfo":''}`}>
        <Link to="/vendors" className={`tipOff backBut ${tipActive?"active":''}`}>
            <div className={`fullWidth`}>
               <img alt="back-button" className="fullImg" src="/images/button-back.svg"></img>
             </div>
             </Link>
          <div className="hideVen" onClick={this.props.venToggle.bind(this)}><p className="tHeroSub tWhite tUpper">{this.props.hideVen?"Show Info":"Hide Info"}</p></div>
            <div className="venHold fullWidth fullHeight relative">
                <div className="venListWindow fullWidth fullHeight">
                <div className="venListHold fullWidth plMed prMed">
                <h1 className="mbMed tWhite mtSm">{barActive?("Proudly Served At:"):("Proudly Carried By:")}</h1>
              {barActive?(
                    bars.map((co,i)=>{
                      return(
                        
                        <div className="singleVend tWhite pbSm bBot bWhite bBotSm ptSm" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >
                          <Link className="fullWidth" to={`/vendors/${co.slug}?loc=1`}>
                          <p className="tCTA fullWidth mbXs tCap" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >{co.name}</p>
                          </Link>
                          <div className="fullWidth flex" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >
                                {co.location.map((loc, l)=>{
                                  return(
                                    <Link className="fullWidth" to={`/vendors/${co.slug}?loc=${l+1}`}>
                                  <div className="col2 tDetails tLeft tUpper fullWidth" data-lat={loc.lat} data-lng={loc.long} data-id={loc.id} >{loc.city}, {loc.state}</div>
                                  </Link>
                                  )
                                })}
                          </div>
                        
                        </div>
                      

                      )})
              ):(

                      data.map((co,i)=>{
                        return(
                          
                          <div key={`company-${i}`} className="singleVend tWhite pbSm bBot bWhite bBotSm ptSm" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >
                            <Link className="fullWidth" to={`/vendors/${co.slug}?loc=1`}>
                            <p className="tCTA fullWidth mbXs tCap" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >{co.name}</p>
                            </Link>
                            <div className="fullWidth flex" data-lat={co.location[0].lat} data-lng={co.location[0].long} data-id={co.location[0].id} >
                                  {co.location.map((loc, l)=>{
                                    return(
                                      <Link key={`location-${l}`} className="fullWidth" to={`/vendors/${co.slug}?loc=${l+1}`}>
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
                <div className={`fullWidth fullHeight tipListHold ${tipActive?"active":''}`}>
                  <Route path='/vendors/*' render={()=><Tip  getImg={this.props.getImg} showVen={this.props.showVen} moveMap={this.moveMap} hideTip={this.hideTip} showTip={this.showTip} tipActive={this.state.tipActive} barOn={this.barOn} win={this.state.win}/>} />

              </div>
              </div>
          </div>

          </div>
        
         {data.length ?(
      <div className="mapHold bgBlue fullWidth" style={{height:win[1]}}>
            
      <div className="eCenter" style={{ height: '100vh', width: '100vw', borderRadius:'30px' }}>
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
