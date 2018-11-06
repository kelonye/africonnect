import React from 'react';
import PropTypes from 'prop-types';
import { USER, pushAction } from 'eos';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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
    const { history, getBusinesses } = this.props;

    pushAction('addbusiness', {
      _owner: USER.name,
      _name,
      _physical_address
    })
      .then(getBusinesses)
      .then(() => {
        history.replace({
          pathname: '/'
        });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form} onSubmit={e => this.handleFormEvent(e)}>
        <div>
          <Typography variant="h6" style={{ color: 'gray' }} component="h2">
            ADD BUSINESS
          </Typography>
          <h5 style={{ margin: 0 }}>You can add many as possible.</h5>
        </div>

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
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Component);
