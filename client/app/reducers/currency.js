import {
  FETCH_CURRENCY,
  REQUEST_COUNTRIES,
  RECIEVE_COUNTRIES,
  REQUEST_RATES,
  RECIEVE_RATES
} from '../actions/types';

export const currency = (
  state = {
    amount: 0,
    source: 'JPY',
    target: 'VND',
    result: 0,
    rate: 0,
    quotes: {}
  }
  , action) => {
    switch (action.type) {
      case FETCH_CURRENCY:
        let rate = action.quotes['USD' + action.target] /  action.quotes['USD' + action.source]
        return Object.assign({}, state, {
          amount: action.amount,
          source: action.source,
          target: action.target,
          rate: rate,
          result: Math.floor(action.amount * rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        });
      default:
        return state;
    }
  }

export const countries = (
  state = {
    isFetching: true,
    items: {}
  },
  action) => {
    switch (action.type) {
      case REQUEST_COUNTRIES:
        return Object.assign({}, state, {
          isFetching: true,
          items: {}
        });
      case RECIEVE_COUNTRIES:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.countries
        });
      default:
        return state;
    }
  }

export const rates = (
  state = {
    isFetching: true,
    items: {}
  },
  action) => {
    switch (action.type) {
      case REQUEST_RATES:
        return Object.assign({}, state, {
          isFetching: true,
          items: {}
        });
      case RECIEVE_RATES:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.quotes
        });
      default:
        return state;
    }
  }