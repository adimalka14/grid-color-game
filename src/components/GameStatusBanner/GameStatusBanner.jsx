import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../../base-component';

export default function GameStatusBanner({ gameState }) {
    if (gameState === 'won') {
        return (
            <Text className="status-banner win" style={{ color: '#00d0ff' }}>
                You Won! 🎉
            </Text>
        );
    }
    if (gameState === 'lost') {
        return (
            <Text className="status-banner lost" style={{ color: '#ff4949' }}>
                You Lost 😞
            </Text>
        );
    }
    return null;
}

GameStatusBanner.propTypes = {
    gameState: PropTypes.string,
};
