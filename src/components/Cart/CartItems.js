import React from "react";
import classes from "./CartItems.module.css";

const CartItems = (props) => {
  const price = `$${props.product.price}`;

  const deleteItemHandler = () => 
  {
    const deletedItem = props.product.forEach((element, index ) => element.splice(1, index))
    console.log(deletedItem);
  }

  return (
    <li key={props.product.id}>
      <div className={classes.container}>
        <div className={classes['cart-column']}>
          <img src={props.product.imageUrl} alt="Cart-items"/>
          <span>{props.product.title}</span>
        </div>
        <span className={classes.price}>{price}</span>
        <div className={classes.quantity}>
          <span>{props.product.quantity}</span>
          <button onClick={deleteItemHandler}>REMOVE</button>
        </div>
      </div>
    </li>
  );
};

export default CartItems;
