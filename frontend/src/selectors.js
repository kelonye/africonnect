import _ from 'lodash';
import { createSelector } from 'reselect';
import { USER } from 'eos';
import store from 'store';

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

export function getVariety(id) {
  return {
    id,
    name: VARIETIES[id]
  };
}

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
    orders.forEach(b => (buff[b.prim_key] = b));
    return buff;
  }
);

export const bidsMapSelector = createSelector(
  state => state.bids,
  bids => {
    const buff = {};
    bids.forEach(b => (buff[b.prim_key] = b));
    return buff;
  }
);

export function getBusinessByKey(primKey) {
  const businesses = businessesMapSelector(store.getState());
  return businesses[primKey];
}

export function getOrderByKey(primKey) {
  const orders = ordersMapSelector(store.getState());
  return orders[primKey];
}

export function getBidByKey(primKey) {
  const bids = bidsMapSelector(store.getState());
  return bids[primKey];
}

export function getGroupByKey(primKey) {
  const groups = groupsMapSelector(store.getState());
  return groups[primKey];
}

export function getOrder(order) {
  order.business = getBusinessByKey(order.business);
  order.variety = getVariety(order.variety);
  order.total_cost = order.quantity * order.budget_unit_price;
  return order;
}

export function getBid(bid) {
  bid.group = getGroupByKey(bid.group);
  bid.order = getOrderByKey(bid.order);
  return bid;
}

export const ordersSelector = createSelector(
  state => state.orders,
  orders => orders.map(getOrder)
);

export const myBusinessesSelector = createSelector(
  state => state.businesses,
  businesses => businesses.filter(b => b.owner === USER.name)
);

export const myGroupsSelector = createSelector(
  state => state.groups,
  myBusinessesSelector,
  (groups, businesses) =>
    groups.filter(g => _.uniqBy(g.members, businesses)).map(getOrder)
);

export const myOrdersSelector = createSelector(
  state => state.orders,
  orders => orders.filter(b => b.owner === USER.name)
);

export const myBidsSelector = createSelector(
  state => state.bids,
  bids => bids.filter(b => b.owner === USER.name).map(getBid)
);
