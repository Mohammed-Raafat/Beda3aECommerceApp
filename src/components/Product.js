import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Label, Item, Button, Icon } from "semantic-ui-react";
import { fetchProduct } from "./../store/actions";
import { Container, Paper, Box, Hidden } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import Rate from "../components/Rate";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  paper: {
    marginTop: 100,
    padding: 20,
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: 50,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
  },
  image: {
    width: 150,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
  },
  imageSkeleton: {
    height: '100%',
    [theme.breakpoints.down("md")]: {
      width: '150px !important',
      height: '150px !important'
    },
  },
  title: {
    marginBottom: 10,
    width: "100%",
  },
  rate: {
    marginBottom: 40,
  },
  description: {
    marginBottom: 40,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
    },
  },
  price: {
    fontSize: "20px !important",
    [theme.breakpoints.down("sm")]: {
      margin: '10px 0 !important',
      textAlign: "center",
    },
  },
  button: {
    width: 200,
    height: 50,
    [theme.breakpoints.between("sm", "md")]: {
      width: 150,
      height: 40,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 40,
    },
  },
}));

const Product = (props) => {
  const { product, match, loading, fetchProduct } = props;
  const classes = useStyle();
  const id = match.params.id;

  useEffect(() => {
    fetchProduct(id);
  }, []);

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Item.Group>
          <Item>
            {loading ? (
              <Item.Image className={classes.image}>
              <Skeleton className={classes.imageSkeleton} />
              </Item.Image>
            ) : (
              <Item.Image src={product.image} className={classes.image} />
            )}
            <Item.Content>
            <Hidden smUp>
                <Label className={classes.price}>
                  {loading ? <Skeleton width={80} /> : "$" + product.price}
                </Label>
                </Hidden>
              <Item.Header className={classes.title}>
                {loading ? <Skeleton width={"80%"} /> : product.title}
              </Item.Header>
              <Item.Meta className={classes.rate}>
                {loading ? (
                  <Rate rate={0} text={0} insideItem />
                ) : (
                  <Rate
                    rate={product.rating.rate}
                    text={product.rating.count}
                    insideItem
                  />
                )}
              </Item.Meta>
              <Item.Description className={classes.description}>
                {loading ? (
                  <Box>
                    <Skeleton count={3} />
                    <Skeleton width={"70%"} />
                  </Box>
                ) : (
                  product.description
                )}
              </Item.Description>
              <Item.Extra>
                <Button
                  primary
                  floated="right"
                  className={classes.button}
                  disabled={loading}
                >
                  <Icon name="cart" /> Add to cart
                </Button>
                <Hidden smDown>
                <Label className={classes.price}>
                  {loading ? <Skeleton width={80} /> : "$" + product.price}
                </Label>
                </Hidden>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.productReducer.product,
    loading: Boolean(!state.productReducer.product),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
