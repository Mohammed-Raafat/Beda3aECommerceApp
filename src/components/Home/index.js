import React from "react";

import { Grid, Paper, Hidden } from "@mui/material";

import Filters from "../filters";
import FiltersModal from "./FiltersModal";
import ProductsView from "./ProductsView";

const Home = () => {
  return (
    <Grid container direction="row" spacing={3}>
      <Hidden mdUp>
        <FiltersModal />
      </Hidden>

      <Hidden mdDown>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: 5 }}>
            <Filters />
          </Paper>
        </Grid>
      </Hidden>

      <Grid item xs={12} md={9}>
        <ProductsView />
      </Grid>
    </Grid>
  );
};

export default Home;