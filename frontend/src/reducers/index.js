import { combineReducers } from 'redux';
import businesses from './businesses';
import groups from './groups';
import orders from './orders';
import bids from './bids';
import balance from './balance';
import drawer from './drawer';

export default combineReducers({
  businesses,
  groups,
  orders,
  bids,
  balance,
  drawer
});
