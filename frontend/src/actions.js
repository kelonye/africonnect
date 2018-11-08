import Promise from 'bluebird';
import { USER, getRows } from 'eos';

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
      getRows('order3').then(payload => {
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

export function getBalance() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      getRows('accounts', { code: 'eosio.token', scope: USER.name }).then(
        balances => {
          for (let i = 0; i < balances.length; i++) {
            const { balance } = balances[i];
            if (-1 !== balance.indexOf('USDT')) {
              dispatch({ type: 'BALANCE', payload: parseInt(balance, 10) });
              resolve();
              break;
            }
          }
          resolve();
        }
      );
    });
}

export function showDrawer() {
  return { type: 'SHOW_DRAWER' };
}

export function hideDrawer() {
  return { type: 'HIDE_DRAWER' };
}
