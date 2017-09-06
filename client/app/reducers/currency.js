import {
  FETCH_CURRENCY
} from '../actions/types';

const initState = {
  amount: 1,
  source: 'JPY',
  target: 'VND'
}

export const currency = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CURRENCY:
      console.log('hello');
      return state;
    default:
      return state;
  }
}
