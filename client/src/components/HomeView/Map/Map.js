import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchPredictionData,
  fetchHistoricalData,
  savePin
} from "../../../actions";
import "../../../scss/Map.scss";
import axios from "axios";
import Popup from "./Popup.js";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class Map extends Component {
  map;
  state = {
    zoom: 3.1,
    minZoom: 2,
    coordinates: { latitude: 37.8283, longitude: -94.5795 },
    historySelections: {
      fipscode: 17033,
      startyear: 1990,
      endyear: 2014
    },
    pins: this.props.pins
  };

  render() {
    return (
      <div id="map" ref={el => (this.mapContainer = el)} className="map">
        {this.props.addingPin
          ? console.log("adding")
          : console.log("not adding")}
        <div id="menu-a" />
        <div id="time-mode">
          <button onClick={this.pastMode}>Past</button>
          <button onClick={this.futureMode}>Future</button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.initMap();
  }

  pastMode = () => {
    console.log("pastMode");
    this.props.fetchHistoricalData(this.state.historySelections);
  };

  futureMode = () => {
    console.log("futureMode");
  };

  initMap = () => {
    // create map with state values
    const { zoom, minZoom } = this.state;
    const { longitude, latitude } = this.state.coordinates;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/brilles/cjv3zbk1u2uw11fqx8i0zgfkj",
      center: [longitude, latitude],
      zoom,
      minZoom
    });

    // load layers
    map.on("load", () => {
      this.futureMode();
      map.addLayer({
        id: "Counties",
        type: "line",
        source: {
          type: "vector",
          url: "mapbox://brilles.8m1jc8xq"
        },
        "source-layer": "2__quake_county-6aj5at",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "rgba(0, 132, 255, 1)",
          "line-width": 1
        }
      });

      map.addLayer({
        id: "Counties Highlighted",
        type: "fill",
        source: {
          type: "vector",
          url: "mapbox://brilles.8m1jc8xq"
        },
        "source-layer": "2__quake_county-6aj5at",
        paint: {
          "fill-color": "rgba(0, 132, 255, 0.247)"
        },
        filter: ["in", "FIPS", ""]
      });

      map.addLayer({
        id: "Quake Risk",
        type: "line",
        source: {
          type: "vector",
          url: "mapbox://brilles.2qq6qnqp"
        },
        "source-layer": "1__quake_contour-5vbtwp",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "green",
          "line-width": 1
        }
      });

      map.addLayer({
        id: "Quakes",
        type: "circle",
        source: {
          type: "vector",
          url: "mapbox://brilles.2xbld1lx"
        },
        "source-layer": "quakes1-1p0ws7",
        paint: {
          "circle-color": "red"
        }
      });

      map.on("click", "Counties", e => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`${e.features[0].properties.NAME} County`)
          .addTo(map);

        const filter = ["in", "FIPS", e.features[0].properties.FIPS];
        map.setFilter("Counties Highlighted", filter);
      });

      const toggleableLayers = ["Quake Risk", "Counties", "Quakes"];

      toggleableLayers.map((layer, index) => {
        const id = toggleableLayers[index];
        const link = document.createElement("a");
        link.href = "#";
        // link.className = "active";
        link.textContent = id;
        map.setLayoutProperty("Quake Risk", "visibility", "none");
        map.setLayoutProperty("Counties", "visibility", "none");
        map.setLayoutProperty("Counties Highlighted", "visibility", "none");
        map.setLayoutProperty("Quakes", "visibility", "none");

        link.onclick = function(e) {
          // toggle layer
          const clickedLayer = this.textContent;

          e.preventDefault();
          e.stopPropagation();

          var visibility = map.getLayoutProperty(clickedLayer, "visibility");

          if (visibility === undefined) {
            map.setLayoutProperty(clickedLayer, "visibility", "none");
            this.className = "";
          } else if (visibility === "visible") {
            map.setLayoutProperty(clickedLayer, "visibility", "none");
            this.className = "";
          } else {
            this.className = "active";
            map.setLayoutProperty(clickedLayer, "visibility", "visible");
          }
        };

        const layers = document.getElementById("menu-a");
        return layers.appendChild(link);
      });
    });

    map.doubleClickZoom.disable();

    map.on("dblclick", e => {
      const userId = this.props.userId;
      const pin = {
        userId: this.props.userId,
        LATITUDE: e.lngLat.lat,
        LONGITUDE: e.lngLat.lng,
        notes: "Is this working?",
        home: 0
      }; // refactor to native format

      // Updates store, DB
      this.props.pins.push(pin);
      this.props.savePin(pin);

      console.log(this.state.coordinates);
      this.props.fetchPredictionData(this.state.coordinates);

      const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        pin.LONGITUDE
      },${pin.LATITUDE}.json?access_token=${
        process.env.REACT_APP_MAPBOX_TOKEN
      }`;
      axios
        .get(URL)
        .then(res => {
          // ! DO NOT STORE THE RESPONSES IN A DB, THAT VIOLATES MAPBOX's TOS.
          this.props.pinAddresses.push(res.data.features[0].place_name);
          const id = this.props.pins.length - 1;
          let popup = new mapboxgl.Popup({
            className: "popup"
          }).setHTML(
            `<div class="address"><h3>Address:</h3> <p>${
              this.props.pinAddresses[id]
            }</p></div>`
          );
          // .setText("<Popup />");

          let marker = new mapboxgl.Marker({
            color: "rgb(0, 132, 255)"
          })
            .setLngLat([pin.LONGITUDE, pin.LATITUDE])
            .setPopup(popup)
            .addTo(map)
            .togglePopup();

          popup.on("open", e => {
            console.log(e.target._lngLat);
            this.setState({
              coordinates: {
                latitude: e.target._lngLat.lat,
                longitude: e.target._lngLat.lng
              }
            });
          });

          popup.on("close", () => {
            console.log("close");
          });
        })
        .catch(error => {
          console.log(error);
        });

      // TODO: add this area not supported for outside of US
    });

    // add map controls
    map
      .addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl,
          countries: "us",
          marker: false
        })
      )
      .addControl(new mapboxgl.NavigationControl())
      .addControl(new mapboxgl.FullscreenControl())
      .addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );

    // Populate pins on map
    this.props.pins.map(pin => {
      let popup = new mapboxgl.Popup({ offset: 20 }).setText([
        pin.latitude,
        pin.longitude // add notes / input for notes etc
      ]);

      new mapboxgl.Marker()
        .setLngLat([pin.longitude, pin.latitude])
        .setPopup(popup)
        .addTo(map);
    });

    // const marker = new mapboxgl.Marker({
    //   draggable: true
    // })
    //   .setLngLat([longitude, latitude])
    //   .setPopup(popup)
    //   .addTo(map);

    // const update = updatedCoordinates => {
    //   this.setState({ coordinates: updatedCoordinates });
    //   this.props.fetchPredictionData(this.state.coordinates);
    // };

    // function onDragEnd() {
    //   const lngLat = marker.getLngLat();

    //   const updatedCoordinates = {
    //     latitude: lngLat.lat.toPrecision(8),
    //     longitude: lngLat.lng.toPrecision(8)
    //   };
    //   update(updatedCoordinates);
    // }

    // this.props.fetchPredictionData(this.state.coordinates);
    // marker.on("dragend", onDragEnd);
  };
}

const mapStateToProps = ({
  fetchingPredictionData,
  coordinatePredictions,
  fetchingHistoricalData,
  historySelections,
  pins,
  addingPin,
  userId,
  fetchingAddress,
  pinAddresses
}) => ({
  fetchingPredictionData,
  coordinatePredictions,
  fetchingHistoricalData,
  historySelections,
  pins,
  addingPin,
  userId,
  fetchingAddress,
  pinAddresses
});

export default connect(
  mapStateToProps,
  { fetchPredictionData, fetchHistoricalData, savePin }
)(Map);
