import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameInstructions.module.scss';
import { COLOR_MAP } from '../../utils/constants.js';
import { GAME_STATE } from '../../utils/gameLogic.js';
import { Card, Text } from '../../base-component/index.js';
import GameStatusBanner from '../GameStatusBanner/GameStatusBanner';

export default function GameInstructions({ targetColors, level, gameState }) {
    const renderInstructions = () => {
        switch (gameState) {
            case GAME_STATE.paused:
            case GAME_STATE.active:
                return (
                    <>
                        <Text>
                            Click on the following colors to remove them:
                        </Text>
                        <div className={styles.targetColors}>
                            {targetColors.map((colorKey) => {
                                const colorData = COLOR_MAP[colorKey];
                                return (
                                    <div
                                        key={colorKey}
                                        style={{
                                            backgroundColor: colorData.value,
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '4px',
                                            margin: '0 5px',
                                            display: 'inline-block',
                                            border: '1px solid #ccc',
                                        }}
                                        title={colorData.name}
                                    />
                                );
                            })}
                        </div>
                    </>
                );

            case GAME_STATE.won:
                return (
                    <>
                        <GameStatusBanner gameState={gameState} />
                        <Text>Press Start to continue</Text>
                    </>
                );

            case GAME_STATE.lost:
                return (
                    <>
                        <GameStatusBanner gameState={gameState} />
                        <Text>Press restart to try again</Text>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Card
            style={{
                borderRadius: '15px 15px 0 0',
                width: '100%',
                ...(window.innerWidth < 768
                    ? { height: '9em' }
                    : { height: '10em' }),
            }}
        >
            <Card>
                <Text>Level {level}</Text>
            </Card>
            <div className="instructions">{renderInstructions()}</div>
        </Card>
    );
}

GameInstructions.propTypes = {
    targetColors: PropTypes.array,
    level: PropTypes.number,
    gameState: PropTypes.oneOf(Object.values(GAME_STATE)),
};
