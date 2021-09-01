import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Message, Confirm, Modal } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Hidden, Typography, Paper, Link } from '@material-ui/core';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import { clearShoppingCart } from './../store/actions';

const useStyle = makeStyles(theme => ({
    summaryCard: {
        position: "sticky",
        top: 125,
        padding: theme.spacing(2),
        margin: 'auto',
    },
    removeBtn: {
        textAlign: 'center'
    },
    summaryCardBtn: {
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

const ShoppingCart = (props) => {
    const { shoppingCart, clearShoppingCart } = props;
    const classes = useStyle();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openSummaryCard, setOpenSummaryCard] = useState(false);
    const total = shoppingCart.length > 0? shoppingCart.map(item => (item.product.price * item.quantity)).reduce((tot, num) => tot + num).toFixed(2) : 0;
    
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };
  
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleYesRemoveAllItems = () => {
        handleCloseConfirm();
        clearShoppingCart();
    };

    const renderedItems = shoppingCart.map(item => {
        return (
            <Grid key={item.id} container item xs={12}>
                <CartItem item={item} />
            </Grid>
        );
    });

    return ( 
        <Container maxWidth='md'>
            <Typography variant="h4" gutterBottom>Shopping cart has ({shoppingCart.length}) {shoppingCart.length === 1? 'item' : 'items'}</Typography>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} md={8}>
                    {
                        renderedItems.length > 0?                    
                        <Grid container spacing={2}>
                            {renderedItems}
                        </Grid> :
                        <Grid item>
                            <Message
                                warning
                                size='large'
                                header='Your shopping cart is empty.'
                                content={<NavLink to='/'>Go shopping.</NavLink>}
                            />
                        </Grid>
                    }
                </Grid>
                <Hidden smDown>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.summaryCard} elevation={3}>
                            <Grid container direction='row' justify='center' spacing={2}>
                                <Grid item xs={6} md={12}>
                                    <Typography variant="h5" gutterBottom>Total:</Typography>
                                    <Typography variant="h4" gutterBottom>${total}</Typography>
                                </Grid>
                                <Grid item container xs={6} md={12} alignItems='center' spacing={1}>
                                    <Grid item sm={12}>
                                        <Button color='green' fluid disabled={shoppingCart.length === 0}>Checkout</Button>
                                    </Grid>
                                    <Grid item sm={12}>
                                        <Button color='blue' fluid basic compact><NavLink to='/'>Continue shopping</NavLink></Button>
                                    </Grid>
                                    <Grid item sm={12}>
                                        <div className={classes.removeBtn}>
                                            <Link component='button' underline='none' color={shoppingCart.length === 0? 'initial' : 'error'} onClick={handleOpenConfirm} disabled={shoppingCart.length === 0}>Remove all items</Link>
                                        </div> 
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Hidden>
            </Grid>
            <Confirm
                open={openConfirm}
                cancelButton='No'
                confirmButton="Yes"
                onCancel={handleCloseConfirm}
                onConfirm={handleYesRemoveAllItems}
                header='Are you sure?'
                content='Your shopping cart items will be removed, Are you sure?'
            />
            <Hidden mdUp>
                <Modal
                    size='tiny'
                    onClose={() => setOpenSummaryCard(false)}
                    onOpen={() => setOpenSummaryCard(true)}
                    open={openSummaryCard}
                    trigger={<Button circular color='blue' icon='arrow right' className={classes.summaryCardBtn} size='huge' />}
                    className={classes.modal}
                >
                    <Modal.Header>
                        Total: ${total}
                    </Modal.Header>
                    <Modal.Content>
                        <Grid container direction='row' justify='center' spacing={2}>
                            <Grid item xs={12}>
                                <Button color='green' fluid disabled={shoppingCart.length === 0}>Checkout</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button color='blue' fluid basic compact><NavLink to='/'>Continue shopping</NavLink></Button>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.removeBtn}>
                                    <Link component='button' underline='none' color={shoppingCart.length === 0? 'initial' : 'error'} onClick={handleOpenConfirm} disabled={shoppingCart.length === 0}>Remove all items</Link>
                                </div> 
                            </Grid>
                        </Grid>
                    </Modal.Content>
                </Modal>
            </Hidden>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart.shoppingCart
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearShoppingCart: () => dispatch(clearShoppingCart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);