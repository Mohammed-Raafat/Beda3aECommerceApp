import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Card, Icon, Image, Button, Label } from "semantic-ui-react";
import Skeleton from 'react-loading-skeleton';
import ImageModal from "./ImageModal";
import { addToShoppingCart, editProductQuantityInShoppingCart, clearShoppingCart } from '../../store/actions';
import { getValueFromArrOfObj, isInArray } from '../../HelperFunctions';

const useStyles = makeStyles(() => ({
  imgDiv: {
    height: 200,
  },
  image: {
    width: 100,
    maxHeight: 150,
  },
  loveBtn: {
    padding: 0,
  },
}));

const ProductGridCard = (props) => {
  const { loading, shoppingCart, product, isInShoppingCart, editProductQuantityInShoppingCart, addToShoppingCart } = props; /*productAddedToWishlist, isInWishList*/
  //const [loved, setLoved] = useState(isInWishList);
  const classes = useStyles();

  const handleAddToCart = () => {
    //let quantity;
    if(shoppingCart.length === 0) {
      addToShoppingCart(product);
    } else {
      const index = shoppingCart.map(item => item.product).indexOf(product);
      if(index !== -1) {
        editProductQuantityInShoppingCart(shoppingCart[index].id, shoppingCart[index].quantity + 1);
      } else {
        addToShoppingCart(product);
      }
      /* shoppingCart.map(item => {
        console.log(item.product.id, product.id)
        if(item.product.id === product.id) {
          editProductQuantityInShoppingCart(product.id, item.quantity + 1);
        } else {
          addToShoppingCart(product);
        }
      }); */
    }
    /* if(isInShoppingCart) {
      console.log('isInShoppingCart')
      shoppingCart.map(item => {
        if(item.id === product.id) {
          quantity = item.quantity;
        }
      });
      editProductQuantityInShoppingCart(product.id, quantity + 1);
    } else {
      console.log('isNOTInShoppingCart')
      addToShoppingCart(product);
    } */
  };

  /*   const handleAddToWishlist = () => {
    setLoved(!loved);
  }; */

  /*   useEffect(() => {
    productAddedToWishlist(product, loved);
  }, [loved]); */

  return (
    <Card>
      {loading ? (
        /* <Placeholder className={classes.imgDiv}>
          <Placeholder.Image rectangular />
        </Placeholder> */
        <Grid>
          <Skeleton style={{lineHeight: 2}} className={classes.imgDiv}/>
        </Grid>
      ) : (
        <ImageModal title={product.title} imgSrc={product.image}>
          <Grid container alignItems="center" className={classes.imgDiv}>
            <Image
              alt={product.title}
              src={product.image}
              className={classes.image}
              centered
            />
          </Grid>
        </ImageModal>
      )}
      <Card.Content>
        <Card.Meta>
          <div>
          {loading? <Skeleton width={50}/> : 
            <Label size="tiny" color="green" circular>
              In stock
            </Label>}
            <label style={{ float: "right", color: "#000" }}>
              {loading? <Skeleton width={50}/> : `$${product.price}`}
            </label>
          </div>
        </Card.Meta>
        <Card.Description>
          {loading? <Skeleton /> : product.title}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Header>
          <Button
            onClick={handleAddToCart}
            color="blue"
            fluid
            disabled={loading}
          >
            <Icon name="cart" /> Add to cart
          </Button>
          {/*     <Button onClick={handleAddToCart} floated='left' size='small' color='blue' compact>
            <Icon name='cart' /> Add to cart
          </Button>
           <IconButton onClick={handleAddToWishlist} aria-label="wishlist" className={classes.loveBtn}>
            <Icon name={loved? 'heart' : 'heart outline'} color='red'/>
          </IconButton> */}
        </Card.Header>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
      loading: state.products.loading,
      //isInShoppingCart: isInArray(state.shoppingCart.shoppingCart, ownProps.product),
      shoppingCart: state.shoppingCart.shoppingCart
      //productQuantity: getValueFromArrOfObj(state.shoppingCart.shoppingCart, ownProps.product, 'quantity')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToShoppingCart: (product) => dispatch(addToShoppingCart(product)),
    editProductQuantityInShoppingCart: (id, quantity) => dispatch(editProductQuantityInShoppingCart(id, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridCard);
