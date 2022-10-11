import { useContext, useEffect, useState } from 'react';
import CartContext from '../store/cart-context';
import Button from '../UI/Button';
import classes from'./Cart.module.css';
import CartCloseButton from './CartCloseButton';
import Modal from '../UI/Modal';
import CartItems from "./CartItems";
import AuthContext from '../store/auth-context';
import axios from "axios";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const authCntx = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const userEmailId = authCntx.email.split('@').join('');
        const newEmailId = userEmailId.split('.').join('');
       
        const fetch = async () => {
            const res = await axios.get(`https://crudcrud.com/api/c2d4e2e8c8c24b479128237e1c80426d/cart${newEmailId}`);
            cartCtx.items = res.data;
            const quantity = res.data.reduce((currNum, item) => {
                return currNum + item.quantity
            }, 0);
            
            cartCtx.totalQuantity(quantity);
            setList(res.data);
            console.log(cartCtx.totalQuantity);
            console.log(cartCtx.items);
            // const price = cartCtx.price.toFixed(2);
            setPrice(cartCtx.price.toFixed(2));


        }
        fetch()
    }, [authCntx.email, cartCtx])
    
    //const price = cartCtx.price.toFixed(2);
    console.log(price)
    const cartItemsList = list.map((item) => (
        <ul className={classes.ul}>
            <CartItems product={item} />
        </ul>
    ));
    
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
            {cartItemsList}
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