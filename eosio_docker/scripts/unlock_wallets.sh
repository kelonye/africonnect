#!/bin/bash
set -o errexit

# set PATH
PATH="$PATH:/opt/eosio/bin"

cleos wallet unlock -n zebrawal --password $(cat ./scripts/zebra_wallet_password.txt) || true
cleos wallet unlock -n eosiomain --password $(cat ./scripts/eosiomain_wallet_password.txt) || true
