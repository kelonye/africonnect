import Promise from 'bluebird';
import { USER, pushAction, getRows } from 'eos';

export function getBusinesses() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      getRows('business').then(payload => {
        dispatch({ type: 'BUSINESSES', payload });
        resolve();
      });
    });
}

export function getGroups() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      getRows('group').then(payload => {
        dispatch({ type: 'GROUPS', payload });
        resolve();
      });
    });
}

export function getOrders() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      getRows('order2').then(payload => {
        dispatch({ type: 'ORDERS', payload });
        resolve();
      });
    });
}

export function getBids() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      getRows('bid3').then(payload => {
        dispatch({ type: 'BIDS', payload });
        resolve();
      });
    });
}
