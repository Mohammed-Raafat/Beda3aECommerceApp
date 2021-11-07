import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Menu, Icon, Button, Segment, Item } from "semantic-ui-react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  FormControl,
  Select,
  Typography,
  Chip,
  Hidden,
} from "@mui/material";


import ProductGridCard from "./ProductGridCard";
import ProductListCard from "./ProductListCard";
import { viewAs, sortBy, addToShoppingCart } from "../../store/actions";
import { sortArrOfObjBy } from "../../HelperFunctions";

const useStyle = makeStyles(() => ({
  categories: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: "0 5px",
    margin: 0,
  },
  chip: {
    margin: 3,
  },
  gridListViewBtn: {
    backgroundColor: "transparent !important",
    padding: "0 5px !important",
  },
}));

const ProductsView = (props) => {
  const {
    loading,
    categories,
    filteredProducts,
    viewAs,
    sortBy,
    wayViewAs,
    addToShoppingCart,
  } = props;

  const classes = useStyle();
  const history = useHistory();

  const [productsToShow, setProductsToShow] = useState(filteredProducts);
  const [activeListViewBtn, setActiveListViewBtn] = useState(wayViewAs === "list");

  const sortingOptions = [
    {
      value: "featured",
      name: "Featured",
    },
    {
      value: "price-asc",
      name: "Price: Low to High",
    },
    {
      value: "price-desc",
      name: "Price: High to Low",
    },
    {
      value: "rating-desc",
      name: "Rating",
    },
  ];

  const handleAddToCart = (product) => {
    addToShoppingCart(product);
  };

  const handleProductClick = (product) => {
    if(product) {
      history.push(`/products/${product.id}`);
    }
  };
  
  const renderGridProducts = (arr) => {
    return arr.map((product) => (
      <ProductGridCard
        key={product.id}
        product={product}
        handleAddToCart={handleAddToCart}
        handleProductClick={handleProductClick}
      />
    ));
  };

  const [renderedProducts, setRenderedProducts] = useState(
    renderGridProducts(productsToShow)
  );

  const renderListProducts = (arr) => {
    return (
      <Item.Group divided>
        {arr.map((product) => (
          <ProductListCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            handleProductClick={handleProductClick}
          />
        ))}
      </Item.Group>
    );
  };

  const renderSkeletonProductsGrid = (len) => {
    return [...Array(len)].map((e, i) => (
      <ProductGridCard key={i} loading={true} />
    ));
  };

  const renderSkeletonProductsList = (len) => {
    return (
      <Item.Group divided>
        {[...Array(len)].map((e, i) => (
          <ProductListCard key={i} loading={true} />
        ))}
      </Item.Group>
    );
  };

  const renderedCategories =
    categories.length === 0 ? (
      <Typography variant="h5">All products</Typography>
    ) : (
      categories.map((category) => {
        return (
          <li key={category} className={classes.chip}>
            <Chip
              label={category.charAt(0).toUpperCase() + category.substring(1)}
            />
          </li>
        );
      })
    );

  const renderedOptions = sortingOptions.map((option) => (
    <option key={option.value} value={option.value}>
      {option.name}
    </option>
  ));

  useEffect(() => {
    setProductsToShow(filteredProducts);
  }, [filteredProducts]);

  useEffect(() => {
    if (wayViewAs === "list") {
      setRenderedProducts(renderListProducts(productsToShow));
    } else if (wayViewAs === "grid") {
      setRenderedProducts(renderGridProducts(productsToShow));
    }
  }, [productsToShow, activeListViewBtn]);

  const handleSort = (value, ascOrDesc) => {
    const newProducts = sortArrOfObjBy(filteredProducts, value, ascOrDesc);
    setProductsToShow([...newProducts]);
  };

  const handleDropdownChange = (e) => {
    let val = e.target.value;
    sortBy(val);
    if (val === "featured") {
      handleSort("id", "asc");
    } else if (val === "rating") {
      handleSort("rating", "desc");
    } else {
      val = val.split("-");
      handleSort(val[0], val[1]);
    }
  };

  const handleListView = () => {
    if (!activeListViewBtn) {
      viewAs("list");
      setActiveListViewBtn(true);
    }
  };

  const handleGridView = () => {
    if (activeListViewBtn) {
      viewAs("grid");
      setActiveListViewBtn(false);
    }
  };

  return (
    <Grid container direction="column">
      <Hidden smDown>
        <Menu attached="top" widths={1}>
          <Menu.Item>
            <Grid item container direction="row" alignItems="center">
              <Grid
                item
                sm={5}
                md={7}
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <ul className={classes.categories}>{renderedCategories}</ul>
              </Grid>
              <Grid
                item
                sm={7}
                md={5}
                container
                direction="row"
                alignItems="center"
              >
                <Grid item xs={6} sm={2} md={3}>
                  <Button.Group size="small">
                    <Button
                      icon
                      onClick={handleGridView}
                      className={classes.gridListViewBtn}
                      disabled={loading}
                    >
                      <Icon
                        name="grid layout"
                        size="large"
                        color={!activeListViewBtn ? "blue" : "grey"}
                      />
                    </Button>
                    <Button
                      icon
                      onClick={handleListView}
                      className={classes.gridListViewBtn}
                      disabled={loading}
                    >
                      <Icon
                        name="list layout"
                        size="large"
                        color={activeListViewBtn ? "blue" : "grey"}
                      />
                    </Button>
                  </Button.Group>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={10}
                  md={9}
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="subtitle1">Sort by:&nbsp;</Typography>
                  <FormControl
                    variant="outlined"
                    size="small"
                    disabled={loading}
                  >
                    <Select native onChange={handleDropdownChange}>
                      {renderedOptions}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Menu.Item>
        </Menu>
      </Hidden>
      <Hidden smUp>
        <Menu attached="top" widths={1}>
          <Menu.Item>
            <Typography variant="subtitle1">Sort by:&nbsp;</Typography>
            <FormControl variant="outlined" size="small">
              <Select native onChange={handleDropdownChange}>
                {renderedOptions}
              </Select>
            </FormControl>
          </Menu.Item>
        </Menu>
      </Hidden>
      <Segment attached>
        <Grid item container spacing={1} style={{ padding: 5 }}>
          {loading
            ? wayViewAs === "grid"
              ? renderSkeletonProductsGrid(9)
              : renderSkeletonProductsList(6)
            : renderedProducts}
        </Grid>
      </Segment>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.productsReducer.loading,
    filteredProducts: state.filtersReducer.filteredProducts,
    wayViewAs: state.filtersReducer.viewAs,
    categories: Object.keys(state.filtersReducer.filteredCategories).filter(
      (category) => state.filtersReducer.filteredCategories[category]
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewAs: (way) => dispatch(viewAs(way)),
    sortBy: (value) => dispatch(sortBy(value)),
    addToShoppingCart: (product) => dispatch(addToShoppingCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);