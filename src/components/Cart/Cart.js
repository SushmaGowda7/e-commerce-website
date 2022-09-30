import { useContext } from 'react';
import CartContext from '../store/CartContext';
import Button from '../UI/Button';
import classes from'./Cart.module.css';
import CartCloseButton from './CartCloseButton';
import Modal from '../UI/Modal';

const Cart = (props) => {

    const cartCtx = useContext(CartContext);

//     const CartItems = <ul className={classes.cart}>{[
//         {
//             title: 'Colors',
//             price: 100,
//             imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
//             quantity: 2
//         },
//         {
//             title: 'Black and white Colors',
//             price: 50,
//             imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
//             quantity: 3
//         },
//         {
//             title: 'Yellow and Black Colors',
//             price: 70,
//             imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
//             quantity: 1
//         }
//     ].map((item) => (<li>{item.title}</li>))
// }</ul>

const price = cartCtx.price.toFixed(2);
const CartItems = cartCtx.items.map((item) => (
    <ul className={classes.ul}>
        <CartItems product={item} />
    </ul>
))
    
return(
    <Modal onClose={props.onClose}>
      <CartCloseButton className={classes.close} onClose={props.onClose} />
      <div className={classes.total}>
        <h2>Cart</h2>
        <div className={classes.wrapper}>
          <span className={classes.item}>ITEM</span>
          <span className={classes.price}>PRICE</span>
          <span className={classes.quantity}>QUANTITY</span>
          </div>
        <div>
            {CartItems}
            <span className={classes['cart-total']}>
                <span>${price}</span>
                <strong>Total</strong>
            </span>
            </div>
            <Button>Purchase</Button>
        </div>
        </Modal>
    );
};

export default Cart;