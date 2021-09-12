import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Message, Modal } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Hidden, Typography } from "@material-ui/core";

import CartItem from "./CartItem";
import SummaryCard from "./SummaryCard";

const useStyle = makeStyles(() => ({
  summaryCardBtn: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    zIndex: 1,
    boxShadow:
      "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%) !important",
  },
  modal: {
    maxWidth: 440,
  },
}));

const ShoppingCart = (props) => {
  const { shoppingCart } = props;
  const classes = useStyle();
  const [openSummaryCard, setOpenSummaryCard] = useState(false);

  const renderedItems = shoppingCart.map((item) => {
    return (
      <Grid key={item.id} container item xs={12}>
        <CartItem item={item} />
      </Grid>
    );
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {`Shopping cart has ${shoppingCart.length} ${shoppingCart.length === 1 ? "item" : "items"}`}
      </Typography>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} md={8}>
          {renderedItems.length > 0 ? (
            <Grid container spacing={2}>
              {renderedItems}
            </Grid>
          ) : (
            <Grid item>
              <Message
                warning
                size="large"
                header="Your shopping cart is empty."
                content={<NavLink to="/">Go shopping.</NavLink>}
              />
            </Grid>
          )}
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} md={4}>
            <SummaryCard />
          </Grid>
        </Hidden>
      </Grid>

      <Hidden mdUp>
        <Modal
          size="tiny"
          onClose={() => setOpenSummaryCard(false)}
          onOpen={() => setOpenSummaryCard(true)}
          open={openSummaryCard}
          trigger={
            <Button
              circular
              color="blue"
              icon="arrow right"
              className={classes.summaryCardBtn}
              size="huge"
            />
          }
          className={classes.modal}
        >
          <SummaryCard />
        </Modal>
      </Hidden>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.shoppingCart.shoppingCart,
  };
};

export default connect(mapStateToProps)(ShoppingCart);