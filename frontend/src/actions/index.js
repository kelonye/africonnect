import eosio from 'eos';
import Promise from 'bluebird';

export function setIdentity(payload) {
  return { type: 'SET_USER', payload };
}

export function login() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const opts = {
        accounts: [eosio.network]
      };
      eosio.scatter.getIdentity(opts).then(user => {
        dispatch(setIdentity(user));
      });
    });
}

export function logout() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      eosio.scatter.forgetIdentity().then(() => {
        dispatch(setIdentity(eosio.scatter.identity));
      });
    });
}
