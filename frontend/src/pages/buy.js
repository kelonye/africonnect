import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { USER, getRows } from 'eos';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({});

class Component extends React.Component {
  state = {
    businesses: [],
    orders: []
  };

  componentDidMount() {
    getRows('business').then(data => {
      const businesses = data.filter(b => b.owner === USER.name);
      this.setState({ businesses });

      getRows('group').then(data => {
        const groups = data.filter(g => _.uniqBy(g.members, businesses));
        this.setState({ groups });
      });

      getRows('order').then(data => {
        const orders = data.filter(b => b.owner === USER.name);
        this.setState({ orders });
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { businesses, orders } = this.state;

    return (
      <div>
        <h1>My Businesses</h1>
        <ul>
          {businesses.map(b => (
            <li key={b.prim_key}>{b.name}</li>
          ))}
        </ul>
        <Link to="/add-business">Add Business</Link>
        <br />

        <h1>My Orders</h1>
        <ul>
          {orders.map(b => (
            <li key={b.prim_key}>{b.prim_key}</li>
          ))}
        </ul>
        <Link to="/order">Create New Order</Link>
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Component);
