import React from 'react';

import classes from "./not-found.module.scss";

const NotFound = () => {
    return (
        <div className={classes.error}>
            <h1 className={classes.error__header}>404!</h1>
            <p className={classes.error__text}>Страницы не существует</p>
        </div>
    );
};

export default NotFound;
