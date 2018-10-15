import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';

import { withStyles } from '@material-ui/core/styles';
import Header from 'components/header';
import Home from 'pages/home';
import theme from 'theme';

const styles = theme => ({});

class Component extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(theme(withStyles(styles)(Component)));
