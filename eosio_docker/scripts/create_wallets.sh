#!/usr/bin/env bash

echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

echo "=== setup wallet: zebrawal ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n zebrawal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > zebra_wallet_password.txt
# Owner key for zebrawal wallet
cleos wallet import -n zebrawal --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
# Active key for zebrawal wallet
cleos wallet import -n zebrawal --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N
