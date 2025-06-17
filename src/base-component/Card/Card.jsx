import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

export default function Card({ children, className, style }) {
    return (
        <div className={`${styles.card} ${className}`} style={style}>
            {children}
        </div>
    );
}

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
};
