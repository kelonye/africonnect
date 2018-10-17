import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 14}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 13}px`
  },
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
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            AFRICONNECT
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Powering Pan-African Trade and Business
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={16} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  LOGIN WITH EOS
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </main>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Component);
