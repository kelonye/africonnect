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
    groups: [],
    bids: []
  };

  componentDidMount() {
    getRows('business').then(data => {
      const businesses = data.filter(b => b.owner === USER.name);
      this.setState({ businesses });

      getRows('group').then(data => {
        const groups = data.filter(g => _.uniqBy(g.members, businesses));
        this.setState({ groups });
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { businesses, groups, bids } = this.state;

    return (
      <div>
        <h1>My Groups</h1>
        <ul>
          {groups.map(b => (
            <li key={b.prim_key}>{b.name}</li>
          ))}
        </ul>
        <Link to="/create-group">Create Group</Link>
        <br />

        <h1>My Businesses</h1>
        <ul>
          {businesses.map(b => (
            <li key={b.prim_key}>{b.name}</li>
          ))}
        </ul>
        <Link to="/add-business">Add Business</Link>
        <br />

        <h1>My Bids</h1>
        <Link to="/create-bid">Create Bid</Link>
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Component);
