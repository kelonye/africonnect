import { Api, Rpc, SignatureProvider } from 'eosjs';
import { TextDecoder, TextEncoder } from 'text-encoding';

const CONTRACT_ACCOUNT = 'zebrauser';

let user = window.localStorage.getItem('user');
if (user) {
  user = JSON.parse(user);
}

const rpc = new Rpc.JsonRpc('http://localhost:8888');

let api;
if (user && user.privateKey) {
  const signatureProvider = new SignatureProvider([user.privateKey]);
  api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
  });
}

export const API = api;
export const USER = user;
export const pushAction = (action, data) =>
  api.transact(
    {
      actions: [
        {
          account: CONTRACT_ACCOUNT,
          name: action,
          authorization: [
            {
              actor: USER.name,
              permission: 'active'
            }
          ],
          data
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    }
  );

export const getRows = (table, opts = {}) =>
  rpc
    .get_table_rows({
      json: true,
      code: opts.code || CONTRACT_ACCOUNT,
      scope: opts.scope || CONTRACT_ACCOUNT,
      table,
      limit: 100
    })
    .then(result => result.rows);

window.login = function(json) {
  window.localStorage.setItem('user', JSON.stringify(json));
};
