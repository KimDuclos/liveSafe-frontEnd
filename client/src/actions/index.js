import axios from "axios";

export const FETCH_PREDICTION_DATA_START = "FETCH_PREDICTION_DATA_START";
export const FETCH_PREDICTION_DATA_SUCCESS = "FETCH_PREDICTION_DATA_SUCCESS";
export const FETCH_PREDICTION_DATA_FAILURE = "FETCH_PREDICTION_DATA_FAILURE";

export const fetchPredictionData = coordinates => dispatch => {
  dispatch({ type: FETCH_PREDICTION_DATA_START });
  const URL = "https://d2drg1tc2gs4lr.cloudfront.net/allpredictions";

  let { latitude, longitude } = coordinates;

  let request = {
    latitude: latitude,
    longitude: longitude,
    years: 20
  };

  axios
    .post(URL, request)
    .then(res =>
      dispatch({ type: FETCH_PREDICTION_DATA_SUCCESS, payload: res.data })
    )
    .catch(error => {
      dispatch({
        type: FETCH_PREDICTION_DATA_FAILURE,
        payload: error.request
      });
    });
};

export const FETCH_RISK_DATA_START = "FETCH_RISK_DATA_START";
export const FETCH_RISK_DATA_SUCCESS = "FETCH_RISK_DATA_SUCCESS";
export const FETCH_RISK_DATA_FAILURE = "FETCH_RISK_DATA_FAILURE";

export const fetchRiskData = fipsCode => dispatch => {
  dispatch({ type: FETCH_RISK_DATA_START });
  const URL = "https://d2drg1tc2gs4lr.cloudfront.net/riskiness";
  axios
    .post(URL, fipsCode)
    .then(res =>
      dispatch({
        type: FETCH_RISK_DATA_SUCCESS,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: FETCH_RISK_DATA_FAILURE,
        payload: error.response
      });
    });
};

export const FETCH_HISTORICAL_DATA_START = "FETCH_HISTORICAL_DATA_START";
export const FETCH_HISTORICAL_DATA_SUCCESS = "FETCH_HISTORICAL_DATA_SUCCESS";
export const FETCH_HISTORICAL_DATA_FAILURE = "FETCH_HISTORICAL_DATA_FAILURE";

export const fetchHistoricalData = fipsCodeAndYearRange => dispatch => {
  dispatch({ type: FETCH_HISTORICAL_DATA_START });
  const URL = "https://d2drg1tc2gs4lr.cloudfront.net/history";
  axios
    .post(URL, fipsCodeAndYearRange)
    .then(res =>
      dispatch({
        type: FETCH_HISTORICAL_DATA_SUCCESS,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: FETCH_HISTORICAL_DATA_FAILURE,
        payload: error.response
      });
    });
};

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

export const getUsers = () => dispatch => {
  axios
    .get("https://labs12.herokuapp.com/users")
    .then(res => dispatch({ type: GET_USERS_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: GET_USERS_FAILURE, payload: err }));
};

export const ADD_PIN_START = "ADD_PIN_START";
export const ADD_PIN_SUCCESS = "ADD_PIN_SUCCESS";
export const ADD_PIN_FAILURE = "ADD_PIN_FAILURE";

export const savePin = pin => dispatch => {
  dispatch({ type: ADD_PIN_START });
  console.log(pin);
  const URL = `https://labs12.herokuapp.com/pin/pins`;
  axios
    .post(URL, pin)
    .then(res => console.log(res))
    .catch(error => console.log(error));
};

export const FETCH_PINS_START = "FETCH_PINS_START";
export const FETCH_PINS_SUCCESS = "FETCH_PINS_SUCCESS";
export const FETCH_PINS_FAILURE = "FETCH_PINS_FAILURE";

export const getPins = pin => dispatch => {
  dispatch({ type: FETCH_PINS_START });
  const URL = `https://labs12.herokuapp.com/pin/pins/${pin.userId}`;
  axios
    .get(URL, pin)
    .then(res => console.log(res))
    .catch(error => console.log(error));
};

export const FETCH_PIN_START = "FETCH_PIN_START";
export const FETCH_PIN_SUCCESS = "FETCH_PIN_SUCCESS";
export const FETCH_PIN_FAILURE = "FETCH_PIN_FAILURE";

export const getPin = pin => dispatch => {
  dispatch({ type: FETCH_PIN_START });
  const URL = `https://labs12.herokuapp.com/pin/pins/${pin.userId}`;
  axios
    .get(URL, ...pin)
    .then(res => console.log(res))
    .catch(error => console.log(error));
};

export const UPDATE_PINS_START = "UPDATE_PINS_START";
export const UPDATE_PINS_SUCCESS = "UPDATE_PINS_SUCCESS";
export const UPDATE_PINS_FAILURE = "UPDATE_PINS_FAILURE";

export const updatePins = pin => dispatch => {
  dispatch({ type: UPDATE_PINS_START });
  const URL = `https://labs12.herokuapp.com/pin/pins/${pin.userId}`;
  axios
    .put(URL, ...pin)
    .then(res => console.log(res))
    .catch(error => console.log(error));
};

export const DELETE_PIN_START = "DELETE_PIN_START";
export const DELETE_PIN_SUCCESS = "DELETE_PIN_START";
export const DELETE_PIN_FAILURE = "DELETE_PIN_FAILURE";

export const deletePin = pin => dispatch => {
  dispatch({ type: DELETE_PIN_START });
  const URL = `https://labs12.herokuapp.com/pin/pins/${pin.userId}`;
  axios
    .delete(URL)
    .then(res => console.log(res))
    .catch(error => console.log(error));
};

export const FLIP_MODE = "FLIP_MODE";

export const flipMode = () => dispatch => {
  dispatch({ type: FLIP_MODE });
};

export const CHANGE_SELECTED_PIN_INDEX = "CHANGE_SELECTED_PIN_INDEX";

export const changePinIndex = index => dispatch => {
  console.log(index);
  dispatch({ type: CHANGE_SELECTED_PIN_INDEX, payload: index });
};

export const CHANGE_TIME_MODE = "CHANGE_TIME_MODE ";

export const changeTimeMode = () => dispatch => {
  dispatch({ type: CHANGE_TIME_MODE });
};

export const SET_DATA = "SET_DATA";
export const SET_DATA_START = "SET_DATA_START";
export const SET_DATA_SUCCESS = "SET_DATA_SUCCESS";

export const setLoginVars = clientInformation => dispatch => {
  function wait() {
    setTimeout(() => {
      dispatch({ type: SET_DATA, payload: clientInformation });
      dispatch({ type: SET_DATA_SUCCESS });
    }, 1000);
  }

  wait();
};

// !STRIPE

export const STRIPE_UPDATE = "STRIPE_UPDATE";

export const updateStripe = () => dispatch => {
  console.log("action triggered");
  dispatch({ type: STRIPE_UPDATE });
};
