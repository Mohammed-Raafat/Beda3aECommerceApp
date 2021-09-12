import React from "react";

import { Grid, Paper, Hidden } from "@material-ui/core";

import Filters from "../Filters/Filters";
import FIltersModal from "./FIltersModal";
import ProductsView from "./ProductsView";

const Home = () => {
  return (
    <Grid container direction="row" spacing={3}>
      <Hidden mdUp>
        <FIltersModal />
      </Hidden>

      <Hidden smDown>
        <Grid item xs={12} md={3} xl={2}>
          <Paper style={{ padding: 5 }}>
            <Filters />
          </Paper>
        </Grid>
      </Hidden>

      <Grid item xs={12} md={9} xl={10}>
        <ProductsView />
      </Grid>
    </Grid>
  );
};

export default Home;