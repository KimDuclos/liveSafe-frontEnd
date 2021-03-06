import React, { Component } from "react";
import NavbarB from "../../components/Shared/NavbarB.js";
import Map from "../../components/HomeView/Map/Map.js";
import Stats from "../../components/HomeView/Stats/Stats.js";
import CompareDeck from "../../components/HomeView/Compare/CompareDeck.js";
import Footer from "../../components/HomeView/Footer";
import Auth from "../../Auth0/Auth.js";
import "../../scss/Home.scss";
import { Grid } from "@material-ui/core";

const auth = new Auth();

class Home extends Component {
  componentDidMount() {
    const { renewSession } = auth;

    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
    }
  }
  dataUpdate = () => {
    console.log("data updated");
  };

  render() {
    return (
      <div className="homeBody">
        <NavbarB auth={auth} />
        <Grid className="main-content" container spacing={2}>
          <Grid className="left-panel" item xs={12} md={8}>
            <Map dataUpdate={this.dataUpdate} />
          </Grid>
          <Grid className="right-panel" item xs={12} md={4}>
            <Grid className="top-panel">
              <Stats />
            </Grid>
            <Grid className="bottom-panel">
              <CompareDeck />
            </Grid>
          </Grid>
          <footer>
            <Footer />
          </footer>
        </Grid>
      </div>
    );
  }
}

export default Home;
