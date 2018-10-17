default:
	@./scripts/deploy_contract.sh zebra zebrauser zebrawal $(cat ./scripts/zebra_wallet_password.txt)

ssh:
	@docker exec -it eosio_zebra_container bash

reset:
	@docker stop eosio_zebra_container || true && docker rm --force eosio_zebra_container || true
	@rm -rf "./eosio_docker/data"
	@mkdir -p "./eosio_docker/data"
	@./start_eosio_docker.sh

.PHONY: reset ssh default
