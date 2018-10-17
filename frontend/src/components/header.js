import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Money from 'components/money';
import { USER } from 'eos';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  button: {},
  hr: {
    margin: 0,
    borderStyle: 'solid',
    borderColor: '#eee',
    borderWidth: 1,
    borderBottom: 'none'
  }
});

class Component extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Toolbar className={classes.toolbarMain}>
        <Typography variant="title" color="inherit" className={classes.grow}>
          AFRICONNECT
        </Typography>

        <div>
          <Button color="inherit" variant="outlined" size="small">
            BALANCE: <Money money={10000 * 100} />
          </Button>
          &nbsp;
          <Link to="/buy">
            <Button variant="outlined" color="primary">
              BUY
            </Button>
          </Link>
          &nbsp;
          <Link to="/sell">
            <Button variant="outlined" color="primary">
              SELL
            </Button>
          </Link>
          &nbsp;
          <Button color="inherit" variant="outlined" size="small">
            {USER.name}
          </Button>
        </div>
      </Toolbar>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Component);
