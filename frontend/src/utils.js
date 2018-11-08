import {
  businessesMapSelector,
  ordersMapSelector,
  bidsMapSelector,
  groupsMapSelector
} from 'selectors';

export function getBusinessByKey(state, primKey) {
  const businesses = businessesMapSelector(state);
  return businesses[primKey];
}

export function getOrderByKey(state, primKey) {
  const orders = ordersMapSelector(state);
  return orders[primKey];
}

export function getBidByKey(state, primKey) {
  const bids = bidsMapSelector(state);
  return bids[primKey];
}

export function getGroupByKey(state, primKey) {
  const groups = groupsMapSelector(state);
  return groups[primKey];
}

export function getOrderBids(state, orderPrimKey) {
  const { bids } = state;
  return bids.filter(b => b.order === orderPrimKey);
}
