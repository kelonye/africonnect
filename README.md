### Getting started

Add the below to your bash config:

    $ alias cleos='docker exec eosio_zebra_container /opt/eosio/bin/cleos -u http://localhost:8888'

Start app:

    $ ./quick_start.sh

### Development

SSH into container:

    $ make ssh

Compile contract (inside the container):

    $ ./scripts/deploy_contract.sh zebra zebrauser zebrawal
