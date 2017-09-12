import 'babel-polyfill';
import { 
  FETCH_CURRENCY,
  REQUEST_COUNTRIES,
  RECIEVE_COUNTRIES,
  REQUEST_RATES,
  RECIEVE_RATES
} from './types';
import fetch from 'isomorphic-fetch';

// fetch currency
export const fetchCurrency = (amount, source, target, quotes) => {
  return {
    type: FETCH_CURRENCY,
    amount,
    source,
    target,
    quotes
  }
}

// load countries
export const requestCountries = () => {
  return {
    type: REQUEST_COUNTRIES
  }
}

export const recieveCountries = (json) => {
  return {
    type: RECIEVE_COUNTRIES,
    countries: json.currencies
  }
}

export const requestRates = () => {
  return {
    type: REQUEST_RATES
  }
}

export const recieveRates = (json) => {
  return {
    type: RECIEVE_RATES,
    quotes: json.quotes
  }
}

export const fetchCountries = () => (dispatch) => {
  dispatch(requestCountries);
  let cachedData = localStorage[RECIEVE_COUNTRIES];
  if (cachedData) {
    return dispatch(recieveCountries(JSON.parse(cachedData)));
  }
  return fetch('http://apilayer.net/api/list?access_key=ef0081b4fc1b73fe4e51927054c99e48')
    .then(response => response.json(), error => console.error(error))
    .then(json => {
      localStorage[RECIEVE_COUNTRIES] = JSON.stringify(json);
      dispatch(recieveCountries(json));
    });
}

export const fetchRates = () => (dispatch) => {
  dispatch(requestRates);
  let cachedData = localStorage[RECIEVE_RATES];
  if (cachedData) {
    return dispatch(recieveRates(JSON.parse(cachedData)));
  }
  return fetch('http://apilayer.net/api/live?access_key=ef0081b4fc1b73fe4e51927054c99e48')
    .then(response => response.json(), error => console.error(error))
    .then(json => {
      localStorage[RECIEVE_RATES] = JSON.stringify(json);
      dispatch(recieveRates(json));
    });
}

