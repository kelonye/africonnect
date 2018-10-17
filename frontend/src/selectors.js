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
    orders.forEach(order => {
      order.business = getBusinessByKey(order.business);
      order.variety = {
        id: order.variety,
        name: VARIETIES[order.variety]
      };
      order.total_cost = order.quantity * order.budget_unit_price;
      buff[order.prim_key] = order;
    });
    return buff;
  }
);

export const bidsMapSelector = createSelector(
  state => state.bids,
  bids => {
    const buff = {};
    bids.forEach(bid => {
      bid.group = getGroupByKey(bid.group);
      bid.order = getOrderByKey(bid.order);
      bid.total_cost = bid.order.quantity * bid.unit_price;
      buff[bid.prim_key] = bid;
    });
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

export const ordersSelector = createSelector(
  state => state.orders,
  orders => orders
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
  state => state.bids,
  (orders, bids) =>
    orders.filter(b => b.owner === USER.name).map(o => {
      o.noOfBids = bids.filter(b => b.order === o.prim_key).length;
      return o;
    })
);

export const myBidsSelector = createSelector(
  state => state.bids,
  bidsMapSelector,
  bids => bids.filter(b => b.owner === USER.name)
);

export const getOrderBids = orderId => {
  const { bids } = store.getState();
  return bids.filter(b => b.order === orderId);
};
