import React, { useState, useEffect, useRef } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ImageModal from './ImageModal';

const useStyle = makeStyles(() => ({
    item: {
        padding: '30px 0 !important'
    },
    itemDescription: {
        height: 85,
        lineHeight: '1.5em !important',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    image: {
        width: 100,
        maxHeight: 150
    },
    loveBtn: {
        padding: 2,
        float: 'right',
    },
    header: {
        width: '100%',
    },
    priceLabel: {
        float: 'right',
    }
}));

const ProductListCard = ({ product, productAddedToCart, /*productAddedToWishlist, isInWishList,*/ removeComponentFlag=false }) => {
    const classes = useStyle();
    //const [loved, setLoved] = useState(isInWishList);

    const handleAddToCart = () => {
      productAddedToCart(product);
    };
    
/*     const handleAddToWishlist = () => {
        setLoved(!loved);
    }; */
    
/*     useEffect(() => {
        productAddedToWishlist(product, loved);
    }, [loved]); */

    //const description = product.description.length < 300? product.description : product.description.substr(0, 250) + '...'; 
    const description = product.description;
    return (
        <Item className={classes.item}>
            <Item.Image>
                <ImageModal title={product.title} imgSrc={product.image}>
                    <Image alt={product.title} src={product.image} className={classes.image} centered />
                </ImageModal>
            </Item.Image>
            <Item.Content>
                <Item.Header className={classes.header}>
                    <Grid item container direction='row'>
                        <Grid item sm={10}>
                            {product.title}
                        </Grid>
                        <Grid item sm={2}>
                            <div className={classes.priceLabel}><Label size='large'>${product.price}</Label></div>
                        </Grid>
                    </Grid>
                </Item.Header>
                <Item.Meta className={classes.itemDescription}>{description}</Item.Meta>
                <Item.Extra>
                    <Button primary floated='right' onClick={handleAddToCart}>
                        <Icon name='cart' /> Add to cart
                    </Button>
{/*                     <IconButton onClick={handleAddToWishlist} aria-label="wishlist" className={classes.loveBtn}>
                        {
                            removeComponentFlag?
                                <Icon name='pin' color='red'/>
                            :
                                <Icon name={loved? 'heart' : 'heart outline'} color='red'/>
                        }
                    </IconButton> */}

                    <Label color='green' circular>In stock</Label>
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};

export default ProductListCard;