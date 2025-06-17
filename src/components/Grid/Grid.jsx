import React from 'react';
import PropTypes from 'prop-types';

import styles from './Grid.module.scss';
import { Cell } from '../../base-component';

export default function Grid({ grid, onClick, className }) {
    return (
        <div
            className={`${styles.grid} ${className}`}
            style={{
                gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
                gridTemplateRows: `repeat(${grid.length}, 1fr)`,
            }}
        >
            {grid.flatMap((row, i) =>
                row.map((cell, j) => (
                    <Cell
                        key={`${i}-${j}`}
                        onClick={() => onClick(i, j)}
                        color={cell.value}
                    />
                ))
            )}
        </div>
    );
}

Grid.propTypes = {
    grid: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                color: PropTypes.string,
                name: PropTypes.string,
            })
        )
    ),
};
