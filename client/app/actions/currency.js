import { FETCH_CURRENCY } from './types';
// fetch currency
export const fetchCurrency = (amount, source, target) => {
  return {
    type: FETCH_CURRENCY,
    amount,
    source,
    target
  }
}

