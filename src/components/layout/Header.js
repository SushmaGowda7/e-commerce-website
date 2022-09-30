import React, { Fragment } from "react";
import classes from "./Header.module.css";
import CartButton from "./CartButton";

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <a href="#blank">HOME</a>
        <a href="#blank">STORE</a>
        <a href="#blank">ABOUT</a>
        <CartButton onClick={props.onShow}/>
      </header>
      <div className={classes.container}>
        <h1>The Generics</h1>
      </div>
    </Fragment>
  );
};

export default Header;
