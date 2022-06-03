import "../styles/AlgoVisualizer.css";

import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { InputField } from "./InputField";
import { ArrayGenerator } from "./ArrayGenerator";
import { BoxContainer } from "./BoxContainer";
import { AlgoControls } from "./AlgoControls";

export const PlayStatusContext = React.createContext({
    isPlaying: false,
    setIsPlaying: () => {},
});

const AlgoVisualizer = ({ algorithm }) => {
    const [initialArray, setInitialArray] = useState([]);
    const [currentArray, setCurrentArray] = useState([]);
    const [arraySizeForGen, setArraySizeForGen] = useState(5);
    const [currentInput, setCurrentInput] = useState("");
    const [currentAlgoState, setCurrentAlgoState] = useState({
        finished: false,
    });
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [sortingSpeed, setSortingSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const currentLocation = useLocation();

    const generateArray = () => {
        const generatedArray = Array.from({ length: arraySizeForGen }, () =>
            Math.floor(Math.random() * 100)
        );
        setCurrentArray(generatedArray);
        setInitialArray(generatedArray.slice());
        setCurrentInput(generatedArray.join([" "]));
        setCurrentAlgoState({ finished: false });
    };

    // Same as componentDidMount
    useEffect(() => {
        generateArray();
    }, []);

    useEffect(() => {
        setIsPlaying(false);
        setCurrentArray(initialArray.slice());
        setCurrentAlgoState({ finished: false });
    }, [currentLocation]);

    useEffect(() => {
        if (shouldUpdate && isPlaying) {
            if (currentAlgoState.finished) {
                setIsPlaying(false);
            } else {
                console.log("running algorithm");
                const newAlgoState = algorithm({
                    arr: currentArray.slice(),
                    ...currentAlgoState,
                });
                console.log(newAlgoState);
                setCurrentAlgoState(newAlgoState);
                if (newAlgoState.finished) {
                    setIsPlaying(false);
                }
            }

            setShouldUpdate(false);
        }
    }, [shouldUpdate, isPlaying]);

    return (
        <div className="algo_demo">
            <PlayStatusContext.Provider
                value={{ isPlaying: isPlaying, setIsPlaying: setIsPlaying }}
            >
                <InputField
                    currentInput={currentInput}
                    setCurrentInput={setCurrentInput}
                    setCurrentArray={setCurrentArray}
                    setInitialArray={setInitialArray}
                    setCurrentAlgoState={setCurrentAlgoState}
                />
                <ArrayGenerator
                    generateArray={generateArray}
                    arraySizeForGen={arraySizeForGen}
                    setArraySizeForGen={setArraySizeForGen}
                />
                <BoxContainer
                    currentAlgoState={currentAlgoState}
                    currentArray={currentArray}
                    setCurrentArray={setCurrentArray}
                    setShouldUpdate={setShouldUpdate}
                    sortingSpeed={sortingSpeed}
                />
                <AlgoControls
                    setShouldUpdate={setShouldUpdate}
                    setSortingSpeed={setSortingSpeed}
                    setCurrentArray={setCurrentArray}
                    setCurrentAlgoState={setCurrentAlgoState}
                    initialArray={initialArray}
                />
            </PlayStatusContext.Provider>
        </div>
    );
};

export default AlgoVisualizer;
