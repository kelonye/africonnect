#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

// Smart Contract Name: zebra
class zebra : public eosio::contract {
  private:
    /// @abi table
    struct business {
      uint64_t      prim_key;  // primary key
      account_name  owner;      // the business owner
      std::string   name;      // the name of the business
      std::string   physical_address; // the physical address
      uint64_t      timestamp; // the store the last update block time

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key: owner
      account_name get_by_owner() const { return owner; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index< N(business), business,
      indexed_by< N(getbyowner), const_mem_fun<business, account_name, &business::get_by_owner> >
      > business_table;

  public:
    using contract::contract;

    /// @abi action
    void addbusiness( account_name _owner, std::string& _name, std::string& _physical_address ) {
      // to sign the action with the given account
      require_auth( _owner );

      business_table obj(_self, _self); // code, scope

      obj.emplace( _self, [&]( auto& address ) {
        address.prim_key    = obj.available_primary_key();
        address.owner       = _owner;
        address.name        = _name;
        address.physical_address = _physical_address;
        address.timestamp   = now();
      });
    }

};

EOSIO_ABI( zebra, (addbusiness) )
