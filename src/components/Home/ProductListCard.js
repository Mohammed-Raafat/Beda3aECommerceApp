import React from 'react';

import Skeleton from 'react-loading-skeleton';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ImageModal from './ImageModal';

const useStyle = makeStyles(() => ({
    item: {
        padding: '30px 0 !important',
        width: '100%'
    },
    itemDescription: {
        height: 85,
        lineHeight: '1.5em !important',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingTop: 10
    },
    image: {
        width: 100,
        maxHeight: 150
    },
    header: {
        width: '100%',
    },
    priceLabel: {
        float: 'right',
    }
}));

const ProductListCard = (props) => {
    const { loading, product, handleAddToCart } = props;
    const classes = useStyle();

    return (
        <Item className={classes.item}>
            <Item.Image>
                {loading && <Skeleton width={"100%"} height={'100%'} />}
                    {!loading && <ImageModal title={product.title} imgSrc={product.image}>
                    <Image alt={product.title} src={product.image} className={classes.image} centered />
                </ImageModal>}
            </Item.Image>
            <Item.Content>
                <Item.Header className={classes.header}>
                    <Grid item container direction='row' spacing={2}>
                        <Grid item sm={10}>
                            {loading ? <Skeleton /> : product.title}
                        </Grid>
                        <Grid item sm={2}>
                            <div className={classes.priceLabel}>{loading ? <Skeleton width={75}/> : '$'+ product.price}</div>
                        </Grid>
                    </Grid>
                </Item.Header>
                <Item.Meta className={classes.itemDescription}>{loading ? <Skeleton width={350} count={3} /> : product.description}</Item.Meta>
                <Item.Extra>
                    <Button primary floated='right' onClick={() => handleAddToCart(product)} disabled={loading}>
                        <Icon name='cart' /> Add to cart
                    </Button>
                    {loading ? <Skeleton width={50} /> : <Label color='green' circular>In stock</Label>}
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};

export default ProductListCard;