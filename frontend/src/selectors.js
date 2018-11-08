import _ from 'lodash';
import { createSelector } from 'reselect';
import { USER } from 'eos';

export const VARIETIES = [
  'Bacon',
  'Fuerte',
  'Gwen',
  'Hass',
  'Lamb Hass',
  'Pinkerton',
  'Reed',
  'Zutano'
];

export const businessesMapSelector = createSelector(
  state => state.businesses,
  businesses => {
    const buff = {};
    businesses.forEach(b => (buff[b.prim_key] = b));
    return buff;
  }
);

export const groupsMapSelector = createSelector(
  state => state.groups,
  groups => {
    const buff = {};
    groups.forEach(b => (buff[b.prim_key] = b));
    return buff;
  }
);

export const ordersMapSelector = createSelector(
  state => state.orders,
  orders => {
    const buff = {};
    orders.forEach(order => (buff[order.prim_key] = order));
    return buff;
  }
);

export const bidsMapSelector = createSelector(
  state => state.bids,
  bids => {
    const buff = {};
    bids.forEach(bid => (buff[bid.prim_key] = bid));
    return buff;
  }
);

export const myBusinessesSelector = createSelector(
  state => state.businesses,
  businesses => businesses.filter(b => b.owner === USER.name)
);

export const myGroupsSelector = createSelector(
  state => state.groups,
  myBusinessesSelector,
  (groups, businesses) => groups.filter(g => _.uniqBy(g.members, businesses))
);

export const myOrdersSelector = createSelector(
  state => state.orders,
  orders => orders.filter(b => b.owner === USER.name)
);

export const myBidsSelector = createSelector(
  state => state.bids,
  bids => bids.filter(b => b.owner === USER.name)
);
