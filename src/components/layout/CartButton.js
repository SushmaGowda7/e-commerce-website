import { Fragment, useContext } from 'react';
import classes from './CartButton.module.css';
import CartContext from '../store/cart-context';

const CartButton =(props) => {
  
  const cartCntx = useContext(CartContext);

  const numberOfCartItems = cartCntx.items.reduce((currentNum, item) => {
    return currentNum + item.quantity;
}, 0);

    return(
      <Fragment>
      <button className={classes.button} onClick={props.onClick}>
        Cart <span className={classes.span}>{numberOfCartItems}</span>
      </button>
    </Fragment>
    )
};

export default CartButton;