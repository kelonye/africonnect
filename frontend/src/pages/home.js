import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    height: '700px'
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  }
});

class Component extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          AFRICONNECT
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Powering Pan-African Trade and Business
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <Link to="/buy">
                <Button variant="outlined" color="primary">
                  BUY
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/sell">
                <Button variant="outlined" color="primary">
                  SELL
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Component);
