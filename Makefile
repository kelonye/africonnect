default:

clean:
	@docker stop eosio_zebra_container || true && docker rm --force eosio_zebra_container || true
	@rm -rf "./eosio_docker/data"
	@mkdir -p "./eosio_docker/data"
	@./start_eosio_docker.sh

.PHONY: clean default
