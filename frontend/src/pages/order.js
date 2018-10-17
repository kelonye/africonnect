import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { USER, pushAction } from 'eos';
import { VARIETIES } from 'selectors';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';

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
  state = {
    business: 0,
    variety: 0,
    quantity: 0
  };

  handleFormEvent(event) {
    event.preventDefault();

    const _business = event.target.business.value;
    const _variety = event.target.variety.value;
    const _quantity = Number(event.target.quantity.value);
    const _budget_unit_price = Math.round(
      Number(event.target.budget_unit_price.value) * 100
    );
    const _delivery_physical_address = event.target.address.value;
    const _note = event.target.note.value;
    const { history, getOrders } = this.props;
    const data = {
      _owner: USER.name,
      _business,
      _variety,
      _quantity,
      _budget_unit_price,
      _delivery_physical_address,
      _note
    };

    console.log(data);

    pushAction('createorder', data)
      .then(getOrders)
      .then(() => {
        history.replace({
          pathname: '/buy'
        });
      });
  }

  render() {
    const { classes, businesses } = this.props;
    const { business, variety } = this.state;
    return (
      <form className={classes.form} onSubmit={e => this.handleFormEvent(e)}>
        <div>
          <h4 style={{ margin: 0 }}>Create Order</h4>
          <h5 style={{ margin: 0 }}>
            Grouped companies will later submit bids to supply your order.
          </h5>
        </div>

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
          <InputLabel htmlFor="budget_unit_price">Budget Unit Price</InputLabel>
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
    );
  }
}

Component.propTypes = {};

const mapStateToProps = ({ businesses }) => {
  return {
    businesses
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
