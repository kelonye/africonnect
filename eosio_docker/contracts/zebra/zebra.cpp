#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <vector>
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

    typedef eosio::multi_index< N(business), business > business_table;

    /// @abi table
    struct group {
      uint64_t      prim_key;  // primary key
      account_name  owner;      // the group owner
      std::string   name;      // the name of the group
      std::vector<uint8_t>   members; // the businesses in the group
      // uint8_t reputation;
      uint64_t      timestamp; // the store the last update block time

      // primary key
      auto primary_key() const { return prim_key; }
    };

    typedef eosio::multi_index< N(group), group > group_table;

    /// @abi table
    struct order {
      uint64_t      prim_key;  // primary key
      account_name  owner;      // the order owner
      uint64_t       business;
      uint8_t       variety;      // enum [Bacon = 0, Fuerte, Gwen, Hass, Lamb Hass, Pinkerton, Reed, Zutano]
      uint64_t      quantity;
      uint64_t      budget_unit_price;
      std::string      delivery_physical_address;
      std::string      note;
      uint64_t      timestamp; // the store the last update block time

      // primary key
      auto primary_key() const { return prim_key; }
    };

    typedef eosio::multi_index< N(order), order > order_table;

    /// @abi table
    struct bid2 {
      uint64_t      prim_key;  // primary key
      account_name  owner;
      uint64_t      order;
      uint64_t      group;
      uint64_t      unit_price;
      uint64_t      timestamp; // the store the last update block time

      // primary key
      auto primary_key() const { return prim_key; }
    };

    typedef eosio::multi_index< N(bid2), bid2 > bid_table;

  public:
    using contract::contract;

    //@abi action
    void droptable(std::string& _table){
      // require_auth(eosio::string_to_name("zebrauser"));

      if (_table == "bid") {
        bid_table example(_self, _self); // code, scope
        for(auto itr = example.begin(); itr != example.end();) {
            itr = example.erase(itr);
        }
      }
    }

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

    /// @abi action
    void addgroup( account_name _owner, std::string& _name, std::vector<uint8_t>& _members ) {
      // to sign the action with the given account
      require_auth( _owner );

      group_table obj(_self, _self); // code, scope

      obj.emplace( _self, [&]( auto& address ) {
        address.prim_key    = obj.available_primary_key();
        address.owner       = _owner;
        address.name        = _name;
        address.members     = _members;
        address.timestamp   = now();
      });
    }

    /// @abi action
    void updategroup( account_name _owner, uint64_t& _id, std::string& _name, std::vector<uint8_t>& _members ) {
      // to sign the action with the given account
      require_auth( _owner );

      group_table obj(_self, _self); // code, scope

      auto itr = obj.find( _id );
      eosio_assert(itr != obj.end(), "group doesn't exists");

      obj.modify(itr, itr->prim_key, [&]( auto& address ) {
        address.name        = _name;
        address.members     = _members;
        address.timestamp   = now();
      });
    }

    /// @abi action
    void createorder(
      account_name _owner,
      uint64_t& _business,
      uint8_t& _variety,
      uint64_t& _quantity,
      uint64_t& _budget_unit_price,
      std::string& _delivery_physical_address,
      std::string& _note
    ) {
      // to sign the action with the given account
      require_auth( _owner );

      order_table obj(_self, _self); // code, scope

      obj.emplace( _self, [&]( auto& address ) {
        address.prim_key    = obj.available_primary_key();
        address.owner       = _owner;
        address.business    = _business;
        address.variety     = _variety;
        address.quantity    = _quantity;
        address.budget_unit_price = _budget_unit_price;
        address.delivery_physical_address = _delivery_physical_address;
        address.note = _note;
        address.timestamp   = now();
      });
    }

    /// @abi action
    void createbid(
      account_name _owner,
      uint64_t& _order,
      uint64_t& _group,
      uint64_t& _unit_price
    ) {
      require_auth( _owner );

      bid_table obj(_self, _self);

      // todo: verify group belongs to owner

      obj.emplace( _self, [&]( auto& address ) {
        address.prim_key    = obj.available_primary_key();
        address.owner       = _owner;
        address.order       = _order;
        address.group       = _group;
        address.unit_price  = _unit_price;
        address.timestamp   = now();
      });
    }
};

EOSIO_ABI( zebra, (addbusiness)(addgroup)(updategroup)(createorder)(createbid) )
