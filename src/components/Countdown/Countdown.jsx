import React from 'react';
import PropTypes from 'prop-types';

import styles from './Countdown.module.scss';
import { Timer } from 'my-awesome-react-timer';

export default function Countdown({ time, initialTime, endTime }) {
    return (
        <div className={styles.countdown}>
            <Timer
                time={time}
                initialTime={initialTime}
                endTime={endTime}
                direction="down"
                strokeWidth={6}
                useWarningColors={true}
                frontStrokeColor="var(--color-on-primary)"
                backStrokeColor="var(--color-primary)"
                timeDisplayColor="var(--color-on-primary)"
            />
        </div>
    );
}

Countdown.propTypes = {
    time: PropTypes.number,
    initialTime: PropTypes.number,
    endTime: PropTypes.number,
};
