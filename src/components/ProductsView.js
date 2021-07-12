import React, { useState, useEffect } from 'react';
import { Menu, Icon, Button, Segment, Item, Card, Label, Placeholder } from 'semantic-ui-react';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ProductGridCard from './ProductGridCard';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import ProductListCard from './ProductListCard';

const useStyle = makeStyles(() => ({
    categories: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: '0 5px',
        margin: 0,
    },
    chip: {
        margin: 3,
    },
    gridListViewBtn: {
        backgroundColor: 'transparent !important',
        padding: '0 5px !important',
    }
}));

const sortBy = (arr, value, ascOrDesc = 'asc') => {
    if(ascOrDesc === 'asc') {
        return arr.sort((a, b) => {
            if(a[value] < b[value]) return -1;
            if(a[value] > b[value]) return 1;
            return 0;
        });
    } else if(ascOrDesc === 'desc') {
        return arr.sort((a, b) => {
            if(a[value] > b[value]) return -1;
            if(a[value] < b[value]) return 1;
            return 0;
        });
    }
};

const ProductsView = ({ loading, categories, filteredProducts, getProductAddedToCart, /*getProductAddedToWishlist, wishlist,*/ sortedBy , getSortedBy}) => {
    const setProductAddedToCart = (prod) => {
        getProductAddedToCart(prod);
    };

/*     const setProductAddedToWishlist = (prod, loved) => {
        getProductAddedToWishlist(prod, loved);
    }; */

    const renderGridProducts = (arr) => {
        return arr.map(product => 
            <Grid key={product.id} item xs={12} sm={6} lg={4} container justify="center">
                <ProductGridCard product={product} productAddedToCart={setProductAddedToCart} /*productAddedToWishlist={setProductAddedToWishlist} isInWishList={wishlist.find(prod => prod.id === product.id)? true : false}*//>
            </Grid>
        );
    };

    const renderListProducts = (arr) => {
        return (
            <Item.Group divided>
                {arr.map(product => <ProductListCard key={product.id} product={product} productAddedToCart={setProductAddedToCart} /*productAddedToWishlist={setProductAddedToWishlist} isInWishList={wishlist.find(prod => prod.id === product.id)? true : false}*//>)}
            </Item.Group>
        );
    };

    const renderSkeletonProducts = (len) => {
        return [...Array(len)].map((e, i) => (
            <Grid key={i} item xs={12} sm={6} lg={4} container justify="center">
                <ProductGridCard loading={true}/>
            </Grid>
        ));
    }

    const classes = useStyle();

    const renderedCategories = categories.length === 0? <Typography variant='h5'>All products</Typography> : categories.map(categ => {
        return (
            <li key={categ} className={classes.chip}>
                <Chip label={categ.charAt(0).toUpperCase() + categ.substring(1)}/>
            </li>
        );
    });
    
    const [productsToShow, setProductsToShow] = useState(filteredProducts);
    const [renderedProducts, setRenderedProducts] = useState(renderGridProducts(productsToShow));
    const [activeListViewBtn, setActiveListViewBtn] = useState(false);
    const options = [
        {
            value: 'default',
            name: 'Default'
        },
        {
            value: 'price-asc',
            name: 'Price: Low to High'
        },
        {
            value: 'price-desc',
            name: 'Price: High to Low'
        },
    ];

    const renderedOptions = options.map(option => <option key={option.value} value={option.value}>{option.name}</option>);

    useEffect(() => {
        setProductsToShow(filteredProducts);
    }, [filteredProducts]);

    useEffect(() => {
        if(activeListViewBtn) {
            setRenderedProducts(renderListProducts(productsToShow));
        } else {
            setRenderedProducts(renderGridProducts(productsToShow));
        }
    }, [productsToShow, activeListViewBtn]);


    const handleSort = (value, ascOrDesc) => {
        const newProducts = sortBy(filteredProducts, value, ascOrDesc);
        setProductsToShow([...newProducts]);
    };

    const handleDropdownChange = (e) => {
        const val = e.target.value;
        if(val === 'default') {
            handleSort('id', 'asc');
        } else {
            handleSort(val.split('-')[0], val.split('-')[1]);
        }
    };

    const handleListView = () => {
        if(!activeListViewBtn) {
            setActiveListViewBtn(true);
        }
    };

    const handleGridView = () => {
        if(activeListViewBtn) {
            setActiveListViewBtn(false);
        }
    };

    return ( 
        <Grid container direction='column'>
            <Hidden xsDown>
                <Menu attached='top' widths={1}>
                    <Menu.Item>
                        <Grid item container direction='row' alignItems='center'>
                            <Grid item sm={5} md={7} container direction='row' alignItems='center'  justify='center'>
                                <ul className={classes.categories}>{renderedCategories}</ul>
                            </Grid>
                            <Grid item sm={7} md={5} container direction='row' alignItems='center'>
                                <Grid item xs={6} sm={2} md={3}>
                                    <Button.Group size='small'>
                                        <Button icon onClick={handleGridView} className={classes.gridListViewBtn} disabled={loading}>
                                            <Icon name='grid layout' size='large' color={!activeListViewBtn? 'blue' : 'grey'}/>
                                        </Button>
                                        <Button icon onClick={handleListView} className={classes.gridListViewBtn} disabled={loading}>
                                            <Icon name='list layout' size='large' color={activeListViewBtn? 'blue' : 'grey'}/>
                                        </Button>
                                    </Button.Group>
                                </Grid>
                                <Grid item xs={6} sm={10} md={9} container direction='row' alignItems='center' justify='center'>
                                    <Typography variant="subtitle1">Sort by:&nbsp;</Typography>    
                                    <FormControl variant="outlined" size='small' disabled={loading}>
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
                <Menu attached='top' widths={1}>
                    <Menu.Item>
                        <Typography variant="subtitle1">Sort by:&nbsp;</Typography>
                        <FormControl variant="outlined" size='small'>
                            <Select native onChange={handleDropdownChange}>
                                <option value='default'>Default</option>
                                <option value='asc'>Price: Low to High</option>
                                <option value='desc'>Price: High to Low</option>
                            </Select>
                        </FormControl>
                    </Menu.Item>
                </Menu>
            </Hidden>
            <Segment attached>
                <Grid item container spacing={1} style={{padding: 5}}>
                    {loading?
                        renderSkeletonProducts(6) : renderedProducts
                    }
                </Grid>
            </Segment>
        </Grid>
    );
}
 
export default ProductsView;

{/*                     <Menu.Item>
                        <div>
                            <ul className={classes.categories}>{renderedCategories}</ul>
                        </div>
                    </Menu.Item>
                    
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button.Group size='small'>
                                <Button icon onClick={handleGridView} className={classes.gridListViewBtn}>
                                    <Icon name='grid layout' size='large' color={!activeListViewBtn? 'blue' : 'grey'}/>
                                </Button>
                                <Button icon onClick={handleListView} className={classes.gridListViewBtn}>
                                    <Icon name='list layout' size='large' color={activeListViewBtn? 'blue' : 'grey'}/>
                                </Button>
                            </Button.Group>
                        </Menu.Item>
                        <Menu.Item>
                            <Typography variant="subtitle1">Sort by:&nbsp;</Typography>
                            <FormControl variant="outlined" size='small'>
                                <Select native onChange={handleDropdownChange}>
                                    <option value='default'>Default</option>
                                    <option value='asc'>Price: Low to High</option>
                                    <option value='desc'>Price: High to Low</option>
                                </Select>
                            </FormControl>
                        </Menu.Item>
                    </Menu.Menu> */}
{/*         <Grid item container direction='row' alignItems='center'>
                <Grid item xs={12} sm={7} md={7} container direction='row' alignItems='center'>
                    <ul className={classes.categories}>{renderedCategories}</ul>
                </Grid>
                <Grid item xs={12} sm={3} md={1} container direction='row' alignItems='center'>
                    <Button.Group size='small'>
                        <Button icon onClick={handleGridView} className={classes.gridListViewBtn}>
                            <Icon name='grid layout' size='large' color={!activeListViewBtn? 'blue' : 'grey'}/>
                        </Button>
                        <Button icon onClick={handleListView} className={classes.gridListViewBtn}>
                            <Icon name='list layout' size='large' color={activeListViewBtn? 'blue' : 'grey'}/>
                        </Button>
                    </Button.Group>
                </Grid>
                <Grid item xs={12} sm={5} md={4} container direction='row' alignItems='center' justify='flex-end' style={{padding: 4}}>
                    <Typography variant="h6">Sort by:&nbsp;</Typography>    
                    <FormControl variant="outlined" size='small'>
                        <Select native onChange={handleDropdownChange}>
                            <option value='default'>Default</option>
                            <option value='asc'>Price: Low to High</option>
                            <option value='desc'>Price: High to Low</option>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid> */}

{/*                             <Menu attached='top' stackable>
                    <Menu.Item>
                        <div>
                            <ul className={classes.categories}>{renderedCategories}</ul>
                        </div>
                    </Menu.Item>
                    
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button.Group size='small'>
                                <Button icon onClick={handleGridView} className={classes.gridListViewBtn}>
                                    <Icon name='grid layout' size='large' color={!activeListViewBtn? 'blue' : 'grey'}/>
                                </Button>
                                <Button icon onClick={handleListView} className={classes.gridListViewBtn}>
                                    <Icon name='list layout' size='large' color={activeListViewBtn? 'blue' : 'grey'}/>
                                </Button>
                            </Button.Group>
                        </Menu.Item>
                        <Menu.Item>
                            <Typography variant="subtitle1">Sort by:&nbsp;</Typography>
                            <FormControl variant="outlined" size='small'>
                                <Select native onChange={handleDropdownChange}>
                                    <option value='default'>Default</option>
                                    <option value='asc'>Price: Low to High</option>
                                    <option value='desc'>Price: High to Low</option>
                                </Select>
                            </FormControl>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu> */}