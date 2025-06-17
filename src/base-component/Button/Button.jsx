import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export default function Button({
    onClick,
    className = '',
    variant = 'primary',
    style = {},
    children,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${styles.btn} ${styles[variant]} ${className}`}
            style={style}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    style: PropTypes.object,
    children: PropTypes.node,
};
