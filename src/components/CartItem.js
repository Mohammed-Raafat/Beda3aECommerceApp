import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Label, Dropdown } from 'semantic-ui-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  image: {
    width: 128,
    height: 128,
    [theme.breakpoints.down('xs')]: {
        margin: 'auto',
        width: 100,
        height: '100%',
    }
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }
}));

const CartItem = ({ item, getRemovedCartItem, getNewItemQuantity }) => {
    const classes = useStyles();
    
    const maxQuantity = 7;
    const options = [...Array(maxQuantity).keys()].map(num => ({ key: num+1, text: (num+1).toString(), value: num+1 }));
    
    const handleDropdownChange = (e, data) => {
        getNewItemQuantity(item, data.value);
    };

    const handleRemoveItem = (e) => {
        e.preventDefault();
        getRemovedCartItem(item);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <div className={classes.image}>
                            <img className={classes.img} alt={item.product.title} src={item.product.image} />
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
                                <Grid container item xs={12} sm={6} justify='flex-start' alignItems='center'>
                                    Quantity:&nbsp;&nbsp;
                                    <Dropdown onChange={handleDropdownChange} options={options} defaultValue={item.quantity} selection compact/>
                                </Grid>
                                <Grid container item xs={12} sm={6} justify='flex-end' alignItems='center'>
                                    <Label color='teal' size='large'>${item.product.price}</Label>
                                </Grid>
                            </Grid>
                            <Grid item container justify='flex-end'>
                                <Link component='button' onClick={handleRemoveItem}  underline='none' color="secondary">Remove</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default CartItem;