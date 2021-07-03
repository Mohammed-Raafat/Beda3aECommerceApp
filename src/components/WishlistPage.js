import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Icon, Image, Item, Message, Segment } from 'semantic-ui-react';
import { Grid, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ProductListCard from './ProductListCard';

const WishlistPage = ({ wishlist }) => {
    const setProductAddedToCart = () => {};
    const setProductAddedToWishlist = () => {};

    const renderedProducts = wishlist.map(product => <ProductListCard key={product.id} product={product} productAddedToCart={setProductAddedToCart} productAddedToWishlist={setProductAddedToWishlist} isInWishList={wishlist.find(prod => prod.id === product.id)? true : false} removeComponentFlag={true}/>);
    
    return (
        <Container maxWidth='md'>
            <Segment>
            {
                renderedProducts.length > 0?
                    <Item.Group divided>
                        {renderedProducts}
                    </Item.Group>
                    :
                    <Grid item>
                        <Message
                            warning
                            size='large'
                            header='Your wishlist is empty.'
                            content={<NavLink to='/'>Go shopping.</NavLink>}
                        />
                    </Grid>
            }
            </Segment>
        </Container>
    );
}

export default WishlistPage;


{/* <div>
            {
                wishlist.map(product => (
                    <Card>
                        <Image src={product.image} size='small' centered />
                        <Card.Content>
                        <Card.Header>{product.title}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>
                            Matthew is a musician living in Nashville.
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            22 Friends
                        </a>
                        </Card.Content>
                    </Card>
                ))
            }
        </div> */}