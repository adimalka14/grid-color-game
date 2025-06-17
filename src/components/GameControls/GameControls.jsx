import React from 'react';
import PropTypes from 'prop-types';
import { FaPause, FaPlay, FaRedo, FaForward } from 'react-icons/fa';

import { GAME_STATE } from '../../utils/gameLogic';
import { Button } from '../../base-component';

export default function GameControls({
    gameState,
    onStartGame,
    onStopGame,
    onResumeGame,
}) {
    const renderButtons = () => {
        switch (gameState) {
            case GAME_STATE.idle:
                return (
                    <Button onClick={onStartGame} variant={'primary'}>
                        <FaPlay />
                    </Button>
                );
            case GAME_STATE.active:
                return (
                    <>
                        <Button onClick={onStopGame} variant={'primary'}>
                            <FaPause />
                        </Button>
                        <Button onClick={onStartGame} variant={'primary'}>
                            <FaRedo />
                        </Button>
                    </>
                );
            case GAME_STATE.paused:
                return (
                    <>
                        <Button onClick={onResumeGame} variant={'primary'}>
                            <FaPlay />
                        </Button>
                        <Button onClick={onStartGame} variant={'primary'}>
                            <FaRedo />
                        </Button>
                    </>
                );
            case GAME_STATE.won:
                return (
                    <Button onClick={onStartGame} variant={'primary'}>
                        <FaForward />
                    </Button>
                );
            case GAME_STATE.lost:
                return (
                    <Button onClick={onStartGame} variant={'primary'}>
                        <FaRedo />
                    </Button>
                );
            default:
                return null;
        }
    };

    return <>{renderButtons()}</>;
}

GameControls.propTypes = {
    gameState: PropTypes.oneOf(Object.values(GAME_STATE)),
    onStartGame: PropTypes.func,
    onStopGame: PropTypes.func,
    onResumeGame: PropTypes.func,
};
