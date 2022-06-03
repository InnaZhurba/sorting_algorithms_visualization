import "../styles/AlgoVisualizer.css";

import { IconButton, Slider } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Pause } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React, { useContext, useEffect, useState } from "react";
import { PlayStatusContext } from "./AlgoVisualizer";

export const AlgoControls = ({
    setShouldUpdate,
    setSortingSpeed,
    setCurrentArray,
    setCurrentAlgoState,
    initialArray,
}) => {
    const { isPlaying, setIsPlaying } = useContext(PlayStatusContext);

    const defaultSpeed = 4.5 - (70 / 100) * 4;

    useEffect(() => {
        setSortingSpeed(defaultSpeed);
    }, []);

    return (
        <div className="algo_navigation">
            <div className="slider_wrapper">
                <Slider
                    defaultValue={70}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    onChange={(ev) => {
                        setSortingSpeed(4.5 - (ev.target.value / 100) * 4);
                    }}
                />
            </div>
            <div className="playback_control">
                {!isPlaying ? (
                    <IconButton
                        onClick={() => {
                            setShouldUpdate(true);
                            setIsPlaying(true);
                        }}
                    >
                        <PlayArrowIcon />
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() => {
                            setShouldUpdate(false);
                            setIsPlaying(false);
                        }}
                    >
                        <Pause />
                    </IconButton>
                )}
                <IconButton
                    onClick={() => {
                        setIsPlaying(false);
                        setCurrentArray(initialArray.slice());
                        setCurrentAlgoState({ finished: false });
                    }}
                >
                    <RestartAltIcon />
                </IconButton>
            </div>
        </div>
    );
};
