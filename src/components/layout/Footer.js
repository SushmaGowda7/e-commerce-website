import React from 'react'
import {BsYoutube, BsSpotify, BsFacebook} from "react-icons/bs"
import classes from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={classes.footer}>
    <h1>The Generics</h1>
    <ul>
        <li><a href="https://www.youtube.com">
            <BsYoutube color='red' size="35px"/>
        </a></li>
        <li><a href="https://spotify.com">
            <BsSpotify color='green' size="30px"/>
        </a></li>
        <li><a href="https://facebook.com">
            <BsFacebook  size="30px"/>
        </a></li>
    </ul>
    </footer>
  );
};

export default Footer;