import React from 'react';
import PropTypes from 'prop-types';

import styles from './Cell.module.scss';

export default function Cell({ color, onClick }) {
    return (
        <div
            className={styles.cell}
            style={{
                backgroundColor: color,
            }}
            onClick={onClick}
        ></div>
    );
}

Cell.PropTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
};
