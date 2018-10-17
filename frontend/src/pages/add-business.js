import React from 'react';
import PropTypes from 'prop-types';
import { USER, pushAction } from 'eos';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Component extends React.Component {
  handleFormEvent(event) {
    event.preventDefault();

    const _name = event.target.name.value;
    const _physical_address = event.target.address.value;
    const { history } = this.props;

    pushAction('addbusiness', {
      _owner: USER.name,
      _name,
      _physical_address
    }).then(() => {
      history.replace({
        pathname: '/'
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <form
            className={classes.form}
            onSubmit={e => this.handleFormEvent(e)}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" name="name" autoComplete="name" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="address">Physical Address</InputLabel>
              <Input
                id="address"
                name="address"
                autoComplete="address"
                multiline={true}
                rows={2}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Component);
