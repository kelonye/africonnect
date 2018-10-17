import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { USER, pushAction } from 'eos';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import { myGroupsSelector, getOrderByKey } from 'selectors';
import Money from 'components/money';

const styles = theme => ({
  paper: {
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
    group: 0
  };

  handleFormEvent(event) {
    event.preventDefault();

    const _group = event.target.group.value;
    const _unit_price = Math.round(Number(event.target.unit_price.value) * 100);
    const { history, getBids } = this.props;
    const _order = Number(this.props.match.params.id);
    const data = {
      _owner: USER.name,
      _order,
      _group,
      _unit_price
    };

    console.log(data);

    pushAction('createbid', data)
      .then(getBids)
      .then(() => {
        history.replace({
          pathname: '/sell'
        });
      });
  }

  render() {
    const { classes, groups, order } = this.props;
    if (!order) return null;
    const { group } = this.state;
    return (
      <form className={classes.form} onSubmit={e => this.handleFormEvent(e)}>
        {!order ? null : (
          <div>
            <h4 style={{ margin: 0 }}>
              Bid on Order: variety(
              {order.varietyName}
              ), unit price(
              <Money money={order.budget_unit_price} />
              ), total(
              <Money money={order.total_cost} />)
            </h4>
            <h5 style={{ margin: 0 }}>
              Requested by: {order.businessObj.name}
            </h5>
          </div>
        )}

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="group">Group</InputLabel>
          <Select
            value={group}
            onChange={e => {
              this.setState({ group: e.target.value });
            }}
            input={<Input name="group" id="group-helper" />}
          >
            {groups.map(b => (
              <MenuItem key={b.prim_key} value={b.prim_key}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="unit_price">Budget Unit Price</InputLabel>
          <Input id="unit_price" name="unit_price" />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          BID
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    groups: myGroupsSelector(state),
    order: getOrderByKey(Number(ownProps.match.params.id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
