import React, { useEffect, useReducer } from 'react';
import 'my-awesome-react-digital-clock/dist/my-awesome-react-digital-clock.css';
import { useTimer } from 'my-awesome-react-timer';

import './App.scss';
import {
    Countdown,
    Grid,
    GameControls,
    GameInstructions,
    Header,
} from './components';
import { Card, Text } from './base-component';

import { createRandomGrid, getNewColor } from './utils/grid';
import { COLOR_MAP, LEVELS } from './utils/constants';
import { checkIsWinning, GAME_STATE } from './utils/gameLogic';

const ACTIONS = {
    SET_LEVEL: 'SET_LEVEL',
    SET_GRID: 'SET_GRID',
    SET_GAME_STATE: 'SET_GAME_STATE',
};

const INITIAL_STATE = {
    level: 1,
    grid: null,
    gameState: GAME_STATE.idle,
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_LEVEL:
            return { ...state, level: action.payload };
        case ACTIONS.SET_GRID:
            return { ...state, grid: action.payload };
        case ACTIONS.SET_GAME_STATE:
            return { ...state, gameState: action.payload };
        default:
            return state;
    }
};

export default function App() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { time, startTimer, stopTimer, resetTimer } = useTimer({
        initialTime: LEVELS[state.level]?.timeSeconds,
        endTime: 0,
        autoStart: false,
        onFinished: () => {
            dispatch({
                type: ACTIONS.SET_GAME_STATE,
                payload: GAME_STATE.lost,
            });
        },
    });

    const updateGrid = (i, j) => {
        if (state.gameState !== GAME_STATE.active) return;

        const newGrid = state.grid.map((row) => [...row]); // העתק רדוד
        const available = LEVELS[state.level].availableColors.map(
            (color) => COLOR_MAP[color]
        );

        newGrid[i][j] = getNewColor(newGrid[i][j], available);

        dispatch({
            type: ACTIONS.SET_GRID,
            payload: newGrid,
        });
    };

    const handleStartGame = () => {
        dispatch({
            type: ACTIONS.SET_GRID,
            payload: createRandomGrid(
                {
                    rows: LEVELS[state.level].gridSize,
                    cols: LEVELS[state.level].gridSize,
                },
                LEVELS[state.level].availableColors.map(
                    (color) => COLOR_MAP[color]
                )
            ),
        });

        dispatch({ type: ACTIONS.SET_GAME_STATE, payload: GAME_STATE.active });
        resetTimer();
        startTimer();
    };

    const handleStopGame = () => {
        dispatch({ type: ACTIONS.SET_GAME_STATE, payload: GAME_STATE.paused });
        stopTimer();
    };

    const handleResumeGame = () => {
        dispatch({ type: ACTIONS.SET_GAME_STATE, payload: GAME_STATE.active });
        startTimer();
    };

    const isGridDisplay = () => {
        return (
            state.gameState === GAME_STATE.active ||
            state.gameState === GAME_STATE.won ||
            state.gameState === GAME_STATE.lost
        );
    };

    useEffect(() => {
        if (
            state.grid &&
            checkIsWinning(state.grid, LEVELS[state.level].targetColors)
        ) {
            dispatch({ type: ACTIONS.SET_GAME_STATE, payload: GAME_STATE.won });
            dispatch({ type: ACTIONS.SET_LEVEL, payload: state.level + 1 });
            stopTimer();
        }
    }, [state.grid]);

    return (
        <>
            <Header />
            <div className={'game-body'}>
                {LEVELS[state.level] ? (
                    <>
                        <GameInstructions
                            targetColors={LEVELS[state.level].targetColors}
                            level={state.level}
                            gameState={state.gameState}
                        />
                        <div className={'game-area'}>
                            {isGridDisplay() && (
                                <>
                                    <div className={'left-panel'}></div>
                                    <Grid
                                        key={state.level}
                                        className={'center-panel'}
                                        grid={state.grid}
                                        onClick={updateGrid}
                                    />
                                </>
                            )}

                            <div className={'right-panel'}>
                                <Card
                                    style={{
                                        gap: '1em',
                                        height: '100%',
                                        ...(window.innerWidth < 768 &&
                                        isGridDisplay()
                                            ? {
                                                  flexDirection: 'row',
                                              }
                                            : {}),
                                    }}
                                >
                                    <GameControls
                                        gameState={state.gameState}
                                        onStartGame={handleStartGame}
                                        onStopGame={handleStopGame}
                                        onResumeGame={handleResumeGame}
                                    />
                                    {(state.gameState === GAME_STATE.paused ||
                                        isGridDisplay()) && (
                                        <Countdown
                                            time={time}
                                            initialTime={
                                                LEVELS[state.level].timeSeconds
                                            }
                                            endTime={0}
                                        />
                                    )}
                                </Card>
                            </div>
                        </div>
                    </>
                ) : (
                    <Card>
                        <Text>Congratulations! You Finished the Game</Text>
                        <br />
                        <Text>New Levels will be added soon...</Text>
                    </Card>
                )}
            </div>
        </>
    );
}
