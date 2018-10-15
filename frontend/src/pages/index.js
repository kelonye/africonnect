import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';

import { withStyles } from '@material-ui/core/styles';
import Header from 'components/header';
import Home from 'pages/home';
import Register from 'pages/register';
import Discover from 'pages/discover';
import theme from 'theme';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const styles = theme => ({});

class Component extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/discover" component={Discover} />
          </div>
        </Router>
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
