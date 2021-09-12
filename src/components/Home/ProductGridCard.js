import React from "react";

import Skeleton from "react-loading-skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Card, Icon, Image, Button, Label } from "semantic-ui-react";

import ImageModal from "./ImageModal";

const useStyles = makeStyles(() => ({
  imgDiv: {
    height: 200,
  },
  image: {
    width: 100,
    maxHeight: 150,
  },
  loveBtn: {
    padding: 0,
  },
}));

const ProductGridCard = (props) => {
  const { loading, product, handleAddToCart } = props;
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      lg={4}
      container
      justify="center"
    >
      <Card>
        {loading ? (
          <Grid>
            <Skeleton style={{ lineHeight: 2 }} className={classes.imgDiv} />
          </Grid>
        ) : (
          <ImageModal title={product.title} imgSrc={product.image}>
            <Grid container alignItems="center" className={classes.imgDiv}>
              <Image
                alt={product.title}
                src={product.image}
                className={classes.image}
                centered
              />
            </Grid>
          </ImageModal>
        )}
        <Card.Content>
          <Card.Meta>
            <div>
              {loading ? (
                <Skeleton width={50} />
              ) : (
                <Label size="tiny" color="green" circular>
                  In stock
                </Label>
              )}
              <label style={{ float: "right", color: "#000" }}>
                {loading ? <Skeleton width={50} /> : `$${product.price}`}
              </label>
            </div>
          </Card.Meta>
          <Card.Description>
            {loading ? <Skeleton /> : product.title}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Header>
            <Button
              onClick={() => handleAddToCart(product)}
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
