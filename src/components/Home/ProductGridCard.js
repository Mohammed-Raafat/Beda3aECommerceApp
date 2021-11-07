import React from "react";
import Skeleton from "react-loading-skeleton";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Box } from "@mui/material";
import { Card, Icon, Image, Button } from "semantic-ui-react";

import Rate from "../Rate";

const useStyles = makeStyles(() => ({
  card: {
    '&:hover': {
      transform: 'scale(1.02) !important',
      transition: 'all .3s ease-in-out'
    }
  },
  imgDiv: {
    height: 200,
  },
  image: {
    width: 100,
    maxHeight: 150,
  },
  title: {
    height: 40,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  price: {
    padding: "10px 0",
    color: "#000",
  },
}));

const ProductGridCard = (props) => {
  const { loading, product, handleAddToCart, handleProductClick} = props;
  const classes = useStyles();

  const onAddToCart = (e) => {
    e.stopPropagation();
    handleAddToCart(product);
  };

  return (
    <Grid item xs={12} sm={6} lg={4} container justifyContent="center">
        <Card onClick={() => handleProductClick(product)} className={classes.card}>
          {loading ? (
            <Grid>
              <Skeleton style={{ lineHeight: 2 }} className={classes.imgDiv} />
            </Grid>
          ) : (
            <Grid container alignItems="center" className={classes.imgDiv}>
              <Image
                alt={product.title}
                src={product.image}
                className={classes.image}
                centered
              />
            </Grid>
          )}
          <Card.Content>
            <Card.Description>
              {loading ? (
                <Box>
                  <Skeleton />
                  <Skeleton width={60} />
                </Box>
              ) : (
                <Box className={classes.title}>{product.title}</Box>
              )}
              <Typography variant="h5" className={classes.price}>
                {loading ? <Skeleton width={80} /> : `$${product.price}`}
              </Typography>
            </Card.Description>
            <Card.Description>
              {loading ? (
                <Rate rate={0} text={0} insideItem />
              ) : (
                <Rate
                  rate={product.rating.rate}
                  text={product.rating.count}
                  insideItem
                />
              )}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card.Header>
              <Button
                onClick={onAddToCart}
                color="blue"
                fluid
                disabled={loading}
              >
                <Icon name="cart" /> Add to cart
              </Button>
            </Card.Header>
          </Card.Content>
        </Card>
    </Grid>
  );
};

export default ProductGridCard;