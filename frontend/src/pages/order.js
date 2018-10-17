import React from 'react';
import PropTypes from 'prop-types';
import { USER, pushAction, getRows } from 'eos';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';

const VARIETIES = [
  'Bacon',
  'Fuerte',
  'Gwen',
  'Hass',
  'Lamb Hass',
  'Pinkerton',
  'Reed',
  'Zutano'
];

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
  state = {
    businesses: [],
    business: 0,
    variety: 0,
    quantity: 0
  };

  componentDidMount() {
    getRows('business').then(data => {
      const businesses = data.filter(b => b.owner === USER.name);
      this.setState({ businesses, business: businesses[0].prim_key });
    });
  }

  handleFormEvent(event) {
    event.preventDefault();

    const _business = event.target.business.value;
    const _variety = event.target.variety.value;
    const _quantity = Number(event.target.quantity.value);
    const _budget_unit_price = Number(event.target.budget_unit_price.value);
    const _delivery_physical_address = event.target.address.value;
    const _note = event.target.note.value;
    const { history } = this.props;

    // console.log(
    //   _business,
    //   _variety,
    //   _quantity,
    //   _budget_unit_price,
    //   _delivery_physical_address,
    //   _note
    // );

    pushAction('createorder', {
      _owner: USER.name,
      _business,
      _variety,
      _quantity,
      _budget_unit_price,
      _delivery_physical_address,
      _note
    }).then(() => {
      history.replace({
        pathname: '/buy'
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { businesses, business, variety } = this.state;
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <form
            className={classes.form}
            onSubmit={e => this.handleFormEvent(e)}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="business">Business</InputLabel>
              <Select
                value={business}
                onChange={e => {
                  this.setState({ business: e.target.value });
                }}
                input={<Input name="business" id="business-helper" />}
              >
                {businesses.map(b => (
                  <MenuItem key={b.prim_key} value={b.prim_key}>
                    {b.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="variety">Variety</InputLabel>
              <Select
                value={variety}
                onChange={e => {
                  this.setState({ variety: e.target.value });
                }}
                input={<Input name="variety" id="variety-helper" />}
              >
                {VARIETIES.map((b, id) => (
                  <MenuItem key={id} value={id}>
                    {b}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="quantity">Quantity</InputLabel>
              <Input id="quantity" name="quantity" type="number" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="budget_unit_price">
                Budget Unit Price
              </InputLabel>
              <Input
                id="budget_unit_price"
                name="budget_unit_price"
                type="number"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="delivery_physical_address">
                Delivery Physical Address
              </InputLabel>
              <Input id="address" name="address" multiline={true} rows={2} />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="note">Note</InputLabel>
              <Input id="note" name="note" multiline={true} rows={2} />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Order
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
