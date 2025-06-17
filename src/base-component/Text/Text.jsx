import React from 'react';
import PropTypes from 'prop-types';

import styles from './Text.module.scss';

export default function Text({ children, className, style }) {
    return (
        <div className={`${styles.text} ${className}`} style={style}>
            {children}
        </div>
    );
}

Text.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
};
