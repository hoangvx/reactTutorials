import { combineReducers } from 'redux';
import * as currencyReducers from './currency';

export default combineReducers(Object.assign(
  currencyReducers,
));