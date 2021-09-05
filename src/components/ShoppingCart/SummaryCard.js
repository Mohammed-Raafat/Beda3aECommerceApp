import React, { useState } from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Button, Message, Confirm, Modal } from "semantic-ui-react";
import {
  Grid,
  Typography,
  Paper,
  Link,
} from "@material-ui/core";
import { clearShoppingCart } from "../../store/actions";

const useStyle = makeStyles((theme) => ({
  summaryCard: {
    position: "sticky",
    top: 125,
    padding: theme.spacing(2),
    margin: "auto",
  },
}));



const SummaryCard = (props) => {
  const { shoppingCart, clearShoppingCart } = props;
  const [openConfirm, setOpenConfirm] = useState(false);

  const classes = useStyle();

  const total =
  shoppingCart.length > 0
    ? shoppingCart
        .map((item) => item.product.price * item.quantity)
        .reduce((tot, num) => tot + num)
        .toFixed(2)
    : 0;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleYesRemoveAllItems = () => {
    handleCloseConfirm();
    clearShoppingCart();
  };

  return (
    <React.Fragment>
          <Paper className={classes.summaryCard} elevation={3}>
      <Grid container direction="row" justify="center" spacing={2}>
        <Grid item xs={6} md={12}>
          <Typography variant="h5" gutterBottom>
            Total:
          </Typography>
          <Typography variant="h4" gutterBottom>
            ${total}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={6}
          md={12}
          alignItems="center"
          spacing={1}
        >
          <Grid item sm={12}>
            <Button
              color="green"
              fluid
              disabled={shoppingCart.length === 0}
            >
              Checkout
            </Button>
          </Grid>
          <Grid item sm={12}>
            <Button color="blue" fluid basic compact>
              <NavLink to="/">Continue shopping</NavLink>
            </Button>
          </Grid>
          <Grid item sm={12}>
            <div className={classes.removeBtn}>
              <Link
                component="button"
                underline="none"
                color={shoppingCart.length === 0 ? "initial" : "error"}
                onClick={handleOpenConfirm}
                disabled={shoppingCart.length === 0}
              >
                Remove all items
              </Link>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    <Confirm
    open={openConfirm}
    cancelButton="No"
    confirmButton="Yes"
    onCancel={handleCloseConfirm}
    onConfirm={handleYesRemoveAllItems}
    header="Are you sure?"
    content="Your shopping cart items will be removed, Are you sure?"
  />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.shoppingCart.shoppingCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearShoppingCart: () => dispatch(clearShoppingCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryCard);