import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import "./scss/App.scss";
import Home2 from "./views/App/Home2.js";
import Profile3 from "./views/App/Profile3";
import SignUp from "./views/App/SignUp.js";
import Login from "./views/App/Login.js";
import Logout from "./views/App/Logout.js";
import Compare from "./views/App/Compare.js";
import Landing from "./views/App/Landing";
import Pricing from "./views/App/Pricing.js";
import About from "./views/App/About/About.js";
import Info from "./views/App/Info.js";
// import Email from "./components/SendGrid/Email";
//stripe
import HomeNotAuthed from "./views/App/HomeNotAuthed.js";
import StripePayment from "./components/StripePayments/StripePayment";
import { UnpaidPrime } from "./views/App/UnpaidPrime";
import Auth from "./Auth0/Auth.js";
import Callback from "./Auth0/Callback.js";
import history from "./Auth0/History";
import { connect } from "react-redux";
import { setLoginVars } from "./actions";


const auth = new Auth();

class App extends Component {
  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  };

function App() {
  return (
    <Router history={history} component={Login}>
      <>
        {/* <Route
          path="/"
          render={() =>
            localStorage.getItem("isLoggedIn") ? <HomeAuthed /> : <Home2 />
          }
        /> */}
        <Route exact path="/" component={Home2} />
        <Route exact path="/pricing" component={Pricing} />
        <Route path="/home" component={HomeAuthed} />
        <Route path="/about" component={About} />
        <Route path="/info" component={Info} />
        <Route path="/landing" component={Landing} />
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} /> {/* NEW! */}
        <Route path="/logout" component={Logout} />
        <Route path="/compare" component={Compare} />
        {/* <Route path="/Email" componet={Email} />  --> potential UI for mass email via SendGrid */}
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />  
        <Route path="/payment" component={StripePayment} />{/* Stripe */}
        <Route path="/primeaccess" component={UnpaidPrime} />{/* Stripe */}
      </>
    </Router>
  );
}

const mapStateToProps = ({ client, fetchingInfo }) => ({
  client,
  fetchingInfo
});

export default connect(
  mapStateToProps,
  { setLoginVars }
)(App);
