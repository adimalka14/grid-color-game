import React from 'react';
import { DigitalClock } from 'my-awesome-react-digital-clock';

import styles from './Header.module.scss';
import { Card, Text } from '../../base-component/index.js';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.jsx';

export default function Header() {
    return (
        <div className={styles.header}>
            <Card
                style={{
                    flexDirection: 'row',
                    gap: '10em',
                    justifyContent: 'center',
                    borderRadius: '0',
                }}
            >
                <div className={styles.clock}>
                    <DigitalClock
                        size={200}
                        bgColor={'var(--color-primary)'}
                        fgColor={'var(--color-on-primary)'}
                        hoverColor={'var(--color-primary-variant)'}
                        timezone={'Asia/Jerusalem'}
                        format={'24h'}
                    />
                </div>
                <Text>
                    <h1>Color Game</h1>
                </Text>
                <ThemeSwitch />
            </Card>
        </div>
    );
}
