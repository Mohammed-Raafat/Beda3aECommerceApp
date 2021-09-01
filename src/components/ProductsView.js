import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Button, Segment, Item } from 'semantic-ui-react';
import { Grid, FormControl, Select, Typography, Chip, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductGridCard from './ProductGridCard';
import ProductListCard from './ProductListCard';
import { viewAs, sortBy} from '../store/actions';
import { sortArrOfObjBy } from './../OwnMethods';

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

const ProductsView = (props) => {
    const { loading, categories, filteredProducts, viewAs, sortBy, wayViewAs /* wishlist*/} = props;

    const renderGridProducts = (arr) => {
        return arr.map(product => 
            <Grid key={product.id} item xs={12} sm={6} lg={4} container justify="center">
                <ProductGridCard product={product} /* isInWishList={wishlist.find(prod => prod.id === product.id)? true : false}*//>
            </Grid>
        );
    };

    const renderListProducts = (arr) => {
        return (
            <Item.Group divided>
                {arr.map(product => <ProductListCard key={product.id} product={product} /*productAddedToWishlist={setProductAddedToWishlist} isInWishList={wishlist.find(prod => prod.id === product.id)? true : false}*//>)}
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
    const [activeListViewBtn, setActiveListViewBtn] = useState(wayViewAs === 'list');
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
        if(wayViewAs === 'list') {
            setRenderedProducts(renderListProducts(productsToShow));
        } else if(wayViewAs === 'grid'){
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
        if(val === 'default') {
            handleSort('id', 'asc');
        } else {
            val = val.split('-');
            handleSort(val[0], val[1]);
        }
    };

    const handleListView = () => {
        if(!activeListViewBtn) {
            viewAs('list');
            setActiveListViewBtn(true);
        }
    };

    const handleGridView = () => {
        if(activeListViewBtn) {
            viewAs('grid');
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
                                {renderedOptions}
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

const mapStateToProps = (state) => {
    return {
        loading: state.products.loading,
        filteredProducts: state.filters.filteredProducts,
        wayViewAs: state.filters.viewAs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewAs: (way) => dispatch(viewAs(way)),
        sortBy: (value) => dispatch(sortBy(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);