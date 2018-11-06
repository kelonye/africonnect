import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { myBidsSelector } from 'selectors';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({});

class Component extends React.Component {
  render() {
    const { classes, bids } = this.props;

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6" style={{ color: 'gray' }} component="h2">
              MY BIDS
            </Typography>
          </div>
          <div>
            <Link to="/search-orders" style={{ fontSize: 18 }}>
              <Button variant="contained" color="primary">
                Find Orders
              </Button>
            </Link>
          </div>
        </div>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>WON</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {bids.map(
              row =>
                !row.orderObj ? null : (
                  <TableRow key={row.prim_key}>
                    <TableCell component="th" scope="row">
                      #{row.orderObj.prim_key}
                    </TableCell>
                    <TableCell>{row.groupObj.name}</TableCell>
                    <TableCell>{!row.won ? 'FALSE' : 'TRUE'}</TableCell>
                    <TableCell>
                      <Link to={`/view-bid/${row.prim_key}`}>
                        <Button color="secondary">VIEW</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Component.propTypes = {};

const mapStateToProps = state => {
  return {
    bids: myBidsSelector(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
