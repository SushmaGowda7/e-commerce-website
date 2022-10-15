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
        const newEmailId = authCntx.email.replace(/[^a-zA-Z0-9]/g, "");
       
        const fetch = async () => {
            const res = await axios.get(`https://crudcrud.com/api/8d065053cb4547cda733e7ec5280cc1a/cart${newEmailId}`);
            
            const cartProduct = res.data;

            let tempPrice = 0;
            cartProduct.forEach((product) => {
                tempPrice += product.price * product.quantity;
            })

            setPrice(tempPrice);
            console.log(tempPrice);

            cartCtx.items = res.data;
            const quantity = res.data.reduce((currNum, item) => {
                return currNum + item.quantity
            }, 0);
            
            cartCtx.totalQuantity(quantity);
            setList(res.data);
            console.log(res.data);
            console.log(cartCtx.totalQuantity);
            console.log(quantity);
            console.log(cartCtx.items);
            
        }
        fetch()
    }, [authCntx.email, cartCtx, price])
    
    const cartItemsList = list.map((item) => (
        <ul key={props.id} id={props.id} className={classes.ul}>
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