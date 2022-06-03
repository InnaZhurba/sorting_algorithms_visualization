import "../styles/AlgoVisualizer.css";

import React, { useContext } from "react";
import { PlayStatusContext } from "./AlgoVisualizer";

export const InputField = ({
    currentInput,
    setCurrentInput,
    setInitialArray,
    setCurrentArray,
    setCurrentAlgoState,
}) => {
    const { isPlaying } = useContext(PlayStatusContext);
    return (
        <div className="array_input">
            <input
                className="elements_input"
                type="text"
                id="elements-input"
                value={currentInput}
                onChange={(ev) => {
                    if (!isPlaying) {
                        const newCurrentArray = ev.target.value
                            .split(" ")
                            .reduce((result, el) => {
                                const parsedInt = parseInt(el);
                                if (!isNaN(parsedInt)) {
                                    result.push(parsedInt);
                                }
                                return result;
                            }, []);
                        setCurrentArray(newCurrentArray);
                        setInitialArray(newCurrentArray.slice());
                        setCurrentInput(ev.target.value);
                        setCurrentAlgoState({ finished: false });
                    }
                }}
            />
        </div>
    );
};