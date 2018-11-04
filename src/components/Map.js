import React, { Component } from "react";

export default class Map extends Component {
  map;
  mapContainer;
  mapMarker = [];
  popup = [];
  state = {
    error: false
  }
  
  componentDidMount() {
    loadScript("https://api.mapbox.com/mapbox-gl-js/v0.50.0/mapbox-gl.js").then(val=>{
      window.mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
      this.initializeMap();
      this.setMarker();
    })
    .catch(err=> {
      alert("Something went wrong! map is not loaded")
      this.setState({
        error: true
      })
    });
  }

  //initalizing map
  initializeMap = () => {
    this.map = new window.mapboxgl.Map({
      container: this.mapContainer, // HTML container id
      style: 'mapbox://styles/mapbox/streets-v9', // style URL
      center: [67.0011, 24.8607], // starting position as [lng, lat]
      zoom: 10
    });
  }

  //Method for set marker in map
  setMarker = () => {
    this.mapMarker = [];
    this.popup = [];
    this.props.venues && this.props.venues.map(arr => {
      var popup = new window.mapboxgl.Popup()
        .setHTML(`<h3>${arr.venue.name}</h3><p>${arr.venue.location.address}</p>`)
        .addTo(this.map)
      var marker = new window.mapboxgl.Marker()
        .setLngLat([arr.venue.location.lng, arr.venue.location.lat])
        .setPopup(popup)
        .addTo(this.map);
      this.mapMarker.push(marker);
      this.popup.push(popup);
      return true;
    });
  }

  //Remove Marker
  removeMarker = (val) => {
    val.map(value => {
      this.mapMarker.map(arr => {
        if (value.venue.location.lng !== arr._lngLat.lng && value.venue.location.lat !== arr._lngLat.lat) {
          arr.remove();
        }
        return true;
      });
      return true;
    });
  }

  //Method for opening popup
  openPopup = (val) => {
    this.mapMarker.map(popup => {
      if (val.venue.location.lng === popup._lngLat.lng && val.venue.location.lat === popup._lngLat.lat) {
        popup.togglePopup();
      }
      return true;
    })
  }

  componentDidUpdate(prevProps) {
    if(window.mapboxgl && !this.state.error){
      this.removeMarker(prevProps.venues)
      this.setMarker();
      if (this.props.fly) {
        //Jump to click item from list
        this.map.flyTo({
          center: [this.props.fly.venue.location.lng, this.props.fly.venue.location.lat],
          zoom: this.map.getZoom() + 1
        });
        //Opening popup detail
        this.openPopup(this.props.fly);
      }
    }
  }

  render() {
    return (
      <div id="map" role="application" ref={el => this.mapContainer = el} aria-label="map"></div>
    )
  }
}

// Load google maps Asynchronously
function loadScript(src) {
  return new Promise(function(resolve, reject){
    var script = document.createElement('script');
    script.src = src;
    script.crossOrigin = true;
    script.addEventListener('load', function () {
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  })
};