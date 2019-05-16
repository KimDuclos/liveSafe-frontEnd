import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Compare } from "styled-icons/material/Compare";
import { ArrowRight2 } from "styled-icons/icomoon/ArrowRight2";
import { connect } from "react-redux";
import { PlayCircle } from "styled-icons/boxicons-regular/PlayCircle";
import { changePinIndex } from "../../../actions";
import { MapMarkerAlt } from "styled-icons/fa-solid/MapMarkerAlt";
import { BuildingHouse } from "styled-icons/boxicons-solid/BuildingHouse";
import { DotsVerticalRounded } from "styled-icons/boxicons-regular/DotsVerticalRounded";
import Loader from "react-loader-spinner";

const PlayGreen = styled(PlayCircle)`
  color: black;
  height: 35px;
  width: 35px;
  border-radius: 6px;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
  cursor: pointer;
  margin-right: 8px;
`;

const DotsBlack = styled(DotsVerticalRounded)`
  color: black;
  height: 18px;
  width: 18px;
  border-radius: 6px;
  opacity: 0.7;
  :hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
  }
  cursor: pointer;
  margin-right: 8px;
`;

const PlayGreenDisabled = styled(PlayCircle)`
  color: black;
  height: 35px;
  width: 35px;
  margin-right: 8px;
  border-radius: 6px;
`;

const HomeRed = styled(BuildingHouse)`
  color: red;
  height: 16px;
  width: 16px;
  margin-right: 8px;
  border-radius: 6px;
`;

const MapPinGreen = styled(MapMarkerAlt)`
  color: #2e64ab9c;
  height: 75px;
  width: 75px;
  margin-bottom: 15px;
`;

const MapPinGreenSmall = styled(MapMarkerAlt)`
  color: #2e64ab;
  height: 15px;
  width: 15px;
  padding-right: 5px;
`;

const ArrowBlack = styled(ArrowRight2)`
  color: black;
  height: 20px;
  width: 20px;
  border-radius: 6px;
  padding-left: 5px;
  cursor: pointer;
`;

class Compare3 extends Component {
  //pulsing icon when addresses on store, change ket to uuid

  tour = () => {
    console.log("tour of counties to be implemented on this click!");
  };

  sendPinIndex = index => {
    console.log("index from ", index);
    this.props.changePinIndex(index);
  };

  render() {
    return (
      <>
        <header>
          <h2>Locations</h2>
        </header>

        <div className="main-compare-card">
          <div className="top">
            {this.props.fetchingPredictionData ? (
              <p className="loader">
                <Loader type="Oval" color="#2e64ab" height="40" width="40" />
              </p>
            ) : this.props.pinAddresses[0] ? (
              this.props.pinAddresses.map((pin, index) => (
                <p className="card" key={index}>
                  {
                    <>
                      <button onClick={this.sendPinIndex(index)}>
                        <div className="card-left">
                          <MapPinGreenSmall />
                          {/* <HomeRed /> */}
                        </div>
                        {pin}
                        <div className="card-right">
                          <DotsBlack />
                        </div>
                      </button>
                    </>
                  }
                </p>
              ))
            ) : (
              <div className="middle">
                <p>
                  <MapPinGreen />
                </p>
                <p className="msg">No pins... double click map to add</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ fetchingPredictionData, pinAddresses }) => ({
  fetchingPredictionData,
  pinAddresses
});

export default connect(
  mapStateToProps,
  { changePinIndex }
)(Compare3);
