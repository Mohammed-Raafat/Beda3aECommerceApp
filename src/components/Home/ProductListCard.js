import React from "react";

import Skeleton from "react-loading-skeleton";
import { Button, Icon, Image, Item } from "semantic-ui-react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import ImageModal from "./ImageModal";
import Rate from "../Rate";

const useStyle = makeStyles(() => ({
  item: {
    padding: "30px 0 !important",
    width: "100%",
  },
  itemDescription: {
    height: 85,
    lineHeight: "1.5em !important",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  image: {
    width: 100,
    maxHeight: 150,
  },
  header: {
    width: "100%",
  },
  priceLabel: {
    float: "right",
  },
}));

const ProductListCard = (props) => {
  const { loading, product, handleAddToCart } = props;
  const classes = useStyle();

  return (
    <Item className={classes.item}>
      <Item.Image>
        {loading ? (
          <Skeleton width={"100%"} height={"100%"} />
        ) : (
          <ImageModal title={product.title} imgSrc={product.image}>
            <Image
              alt={product.title}
              src={product.image}
              className={classes.image}
              centered
            />
          </ImageModal>
        )}
      </Item.Image>
      <Item.Content>
        <Item.Header className={classes.header}>
          <Grid item container direction="row" spacing={2}>
            <Grid item sm={10}>
              {loading ? <Skeleton /> : product.title}
            </Grid>
            <Grid item sm={2}>
              <div className={classes.priceLabel}>
                {loading ? <Skeleton width={75} /> : "$" + product.price}
              </div>
            </Grid>
          </Grid>
        </Item.Header>
        <Item.Meta className={classes.itemDescription}>
          {loading ? <Skeleton width={350} count={3} /> : product.description}
        </Item.Meta>
        <Item.Extra>
          <Grid container alignItems="center">
            <Grid item sm={4}>
              {loading ? (
                <Rate rate={0} text={0} insideItem />
              ) : (
                <Rate
                  rate={product.rating.rate}
                  text={product.rating.count}
                  insideItem
                />
              )}
            </Grid>
            <Grid container item sm={8} justifyContent="flex-end">
              <Button
                primary
                onClick={() => handleAddToCart(product)}
                disabled={loading}
              >
                <Icon name="cart" /> Add to cart
              </Button>
            </Grid>
          </Grid>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ProductListCard;
