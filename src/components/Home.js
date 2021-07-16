import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Hidden } from '@material-ui/core';
//import Paper from '@material-ui/core/Paper';
//import Hidden from '@material-ui/core/Hidden';
import ProductsView from './ProductsView';
import Filters from './Filters';

const useStyles = makeStyles(() => ({
    filterBtn: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zIndex: 1,
        boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%) !important',
    },
    modal: {
        maxWidth: 440,
    }
}));

const Home = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const getProductAddedToCart = (prod) => {
        props.getProductAddedToCart(prod);
    };

/*     const getProductAddedToWishlist = (prod, loved) => {
        props.getProductAddedToWishlist(prod, loved);
    }; */

    return ( 
            <Grid container direction="row" spacing={3}>
                <Hidden mdUp>
                    <Modal
                        size='tiny'
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button circular color='blue' icon='filter' className={classes.filterBtn} size='huge' disabled={props.state.loading}/>}
                        className={classes.modal}
                    >
                        <Modal.Header>Filters</Modal.Header>
                        <Modal.Content>
                            <Filters
                                loading={props.state.loading}
                                filteredCategories={props.state.filteredCategories}
                                getCategoriesFilteration={props.getCategoriesFilteration}
                                price={props.state.filteredPrice}
                                getPriceFilteration={props.getPriceFilteration}
                            />
                        </Modal.Content>
                    </Modal>
                </Hidden>
                <Hidden smDown>
                    <Grid item xs={12} md={3} xl={2}>
                        <Paper style={{padding: 5}}>
                            <Filters
                                loading={props.state.loading}
                                filteredCategories={props.state.filteredCategories}
                                getCategoriesFilteration={props.getCategoriesFilteration}
                                price={props.state.filteredPrice}
                                getPriceFilteration={props.getPriceFilteration}
                            />
                        </Paper>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={9} xl={10}>
                    <ProductsView
                        loading={props.state.loading}
                        categories={Object.keys(props.state.filteredCategories).filter(key => props.state.filteredCategories[key])}
                        filteredProducts={props.state.filteredProducts}
                        getProductAddedToCart={getProductAddedToCart}
                        //getProductAddedToWishlist={getProductAddedToWishlist}
                        //wishlist={props.state.wishlist}
                        sortedBy={props.state.sortedBy}
                        getSortedBy={props.getSortedBy}
                    />
                </Grid>
            </Grid>
    );
}
 
export default Home;