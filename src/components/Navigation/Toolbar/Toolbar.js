import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NvaigationItems from '../NavigationItems/NavigationItems';
const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <Logo />
        <nav>
            <NvaigationItems />
        </nav>
    </header>
);

export default toolbar;