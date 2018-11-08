import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Orders from './orders';

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  }
});

class Component extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography
          variant="h6"
          style={{ color: 'gray' }}
          gutterBottom
          component="h2"
        >
          DASHBOARD
        </Typography>
        <Typography variant="h4" gutterBottom component="h2">
          Orders Overview
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <Orders />
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Component);
