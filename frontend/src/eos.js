import EOS from 'eosjs';
import { setIdentity } from './actions';
import store from './store';

export default new class {
  constructor() {
    this.network = {
      blockchain: 'eos',
      host: 'localhost',
      port: 8888,
      protocol: 'http',
      chainId:
        'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
    };

    document.addEventListener('scatterLoaded', scatterExtension => {
      this.scatter = window.scatter;

      store.dispatch(setIdentity(this.scatter.identity));

      this.eos = this.scatter.eos(this.network, EOS, { verbose: true });
    });
  }
}();
