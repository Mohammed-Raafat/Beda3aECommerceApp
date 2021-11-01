import React from "react";
import { connect } from "react-redux";
import { Label, Dropdown } from "semantic-ui-react";
import { Grid, Paper, Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";

import {
  deleteFromShoppingCart,
  editProductQuantityInShoppingCart,
} from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  image: {
    width: 128,
    height: 128,
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      width: 100,
      height: "100%",
    },
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const CartItem = (props) => {
  const { item, editProductQuantityInShoppingCart, deleteFromShoppingCart } = props;
  const classes = useStyles();

  const maxQuantity = 7;
  const options = [...Array(maxQuantity).keys()].map((num) => ({
    key: num + 1,
    text: (num + 1).toString(),
    value: num + 1,
  }));

  const handleDropdownChange = (e, data) => {
    editProductQuantityInShoppingCart(item.id, data.value);
  };

  const handleRemoveItem = (e) => {
    e.preventDefault();
    deleteFromShoppingCart(item.id);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <div className={classes.image}>
              <img
                className={classes.img}
                alt={item.product.title}
                src={item.product.image}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={9} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography gutterBottom variant="subtitle1">
                  {item.product.title}
                </Typography>
              </Grid>
              <Grid item container>
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  Quantity:&nbsp;&nbsp;
                  <Dropdown
                    onChange={handleDropdownChange}
                    options={options}
                    defaultValue={item.quantity}
                    selection
                    compact
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Label color="teal" size="large">
                    ${item.product.price}
                  </Label>
                </Grid>
              </Grid>
              <Grid item container justifyContent="flex-end">
                <Link
                  component="button"
                  onClick={handleRemoveItem}
                  underline="none"
                  color="error"
                >
                  Remove
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromShoppingCart: (itemId) =>
      dispatch(deleteFromShoppingCart(itemId)),
    editProductQuantityInShoppingCart: (itemId, newQuantity) =>
      dispatch(editProductQuantityInShoppingCart(itemId, newQuantity)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);