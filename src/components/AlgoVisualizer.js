import "../styles/AlgoDemo.css";

import { IconButton, Slider } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Pause } from "@mui/icons-material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";

const PlayStatusContext = React.createContext({isPlaying: false, setIsPlaying: () => {}})

const AlgoVisualizer = ({algorithm}) => {
    const [initialArray, setInitialArray] = useState([]);
    const [currentArray, setCurrentArray] = useState([]);
    const [arraySizeForGen, setArraySizeForGen] = useState(5);
    const [currentInput, setCurrentInput] = useState("");
    const [currentAlgoState, setCurrentAlgoState] = useState({finished: false});
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [sortingSpeed, setSortingSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [isFinished, setIsFinished] = useState(false);

    const generateArray = () => {
        const generatedArray = Array.from({length: arraySizeForGen}, () => Math.floor(Math.random() * 100));
        setCurrentArray(generatedArray);        
        setInitialArray(generatedArray.slice());
        setCurrentInput(generatedArray.join([" "]));
        setCurrentAlgoState({finished: false});
    };

    // Same as componentDidMount
    useEffect(() => {
        generateArray();
    }, []);

    useEffect(() => {
        if (shouldUpdate && isPlaying) {
            if (currentAlgoState.finished) {
                setIsPlaying(false);
            } else {
                console.log("running algorithm");
                const newAlgoState = algorithm({arr:currentArray.slice(), ...currentAlgoState});
                console.log(newAlgoState);
                setCurrentAlgoState(newAlgoState);
                if (newAlgoState.finished) {
                    setIsPlaying(false);
                }
            }
            
            setShouldUpdate(false);
        }
    }, [shouldUpdate]);

    return <div className="algo_demo">
        <PlayStatusContext.Provider value={{isPlaying: isPlaying, setIsPlaying: setIsPlaying}}>
            <InputField currentInput={currentInput} setCurrentInput={setCurrentInput} setCurrentArray={setCurrentArray} setCurrentAlgoState={setCurrentAlgoState} />
            <ArrayGenerator generateArray={generateArray} arraySizeForGen={arraySizeForGen} setArraySizeForGen={setArraySizeForGen} />
            <BoxContainer currentAlgoState={currentAlgoState}
                            currentArray={currentArray}
                            setCurrentArray={setCurrentArray}
                            setShouldUpdate={setShouldUpdate}
                            sortingSpeed={sortingSpeed}
                            />
            <AlgoControls setShouldUpdate={setShouldUpdate} setSortingSpeed={setSortingSpeed} setCurrentArray={setCurrentArray} initialArray={initialArray}/>
        </PlayStatusContext.Provider>
    </div>
}

const InputField = ({currentInput, setCurrentInput, setCurrentArray, setCurrentAlgoState}) => {
    const {isPlaying} = useContext(PlayStatusContext);
    return <div className="array_input">
                <input className="elements_input" type="text" id="elements-input" value={currentInput} onChange={
                    (ev) => {
                        if (!isPlaying) {
                            setCurrentArray(ev.target.value.split(" "));
                            setCurrentInput(ev.target.value);
                            setCurrentAlgoState({finished: false});
                        }
                    }
                }/>
            </div>
}

const ArrayGenerator = ({generateArray, arraySizeForGen, setArraySizeForGen}) => {
    return <div className="size_generation">
        <div className="array_size">
            <label className="algo_description" >Array size: </label>
            <input className="size_input" type="text" id="size-input" value={arraySizeForGen} onChange={(ev) => {
                const parsedInt = parseInt(ev.target.value);
                setArraySizeForGen(isNaN(parsedInt) ? 0 : parsedInt);
                }}/>
        </div>
        <div className="generate_button_wrapper">
            <button className="generate_button" type="button" onClick={() => generateArray()}>
                Generate
            </button>
        </div>
    </div>
}

const AlgoControls = ({setShouldUpdate, setSortingSpeed, setCurrentArray, initialArray}) => {
    // const [buttonWasPressed, setButtonWasPressed] = useState(false);
    const {isPlaying, setIsPlaying} = useContext(PlayStatusContext);

    const defaultSpeed = 4.5 - 50/100 * 4;

    useEffect(() => {
        setSortingSpeed(defaultSpeed);
    }, []);

    return <div className="algo_navigation">
        <div className="slider_wrapper">
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" onChange={
                (ev) => {
                    setSortingSpeed(4.5 - ev.target.value/100 * 4);
                }
            }/>
        </div>
        <div className="playback_control">        
            { !isPlaying ? <IconButton onClick={() => {
                // setButtonWasPressed(true)
                setShouldUpdate(true);
                setIsPlaying(true);
            }}><PlayArrowIcon /></IconButton> : <IconButton onClick={() => {
                // setButtonWasPressed(false)
                setShouldUpdate(false);
                setIsPlaying(false);
                }}><Pause /></IconButton>}
            <IconButton onClick={
                () => {
                    // It doesn't work :(
                    setIsPlaying(false);
                    console.log("Initial array: " + initialArray);
                    setCurrentArray(initialArray.slice());
                }
            }><RestartAltIcon/></IconButton>
        </div>
    </div>
}

const BoxContainer = ({currentAlgoState, currentArray, setCurrentArray, setShouldUpdate, sortingSpeed}) => {
    const [firstAnimFinished, setFirstAnimFinished] = useState(false);
    const [secondAnimFinished, setSecondAnimFinished] = useState(false);
    const [animationForElements, setAnimationForElements] = useState([]);
    const [indexesForSwap, setIndexesForSwap] = useState({});
    const [indexesForSelect, setIndexesForSelect] = useState({});

    // When both animations are finished
    useEffect(() => {
        if (firstAnimFinished && secondAnimFinished) {
            console.log("both animations finished!");
            setFirstAnimFinished(false);
            setSecondAnimFinished(false);
            
            const {swappedIndex1, swappedIndex2} = currentAlgoState;
            const newCurrentArray = swapElements(currentArray, swappedIndex1, swappedIndex2);
            setCurrentArray(newCurrentArray);
            setShouldUpdate(true);
        }
    }, [firstAnimFinished, secondAnimFinished]);


    useEffect(() => {
        console.log("currentAlgoState bruh");
        const {swappedIndex1, swappedIndex2} = currentAlgoState;
        if (swappedIndex1 == undefined) {
            const {indexForSelect1, indexForSelect2} = currentAlgoState;
            setIndexesForSelect({
                indexForSelect1: indexForSelect1,
                indexForSelect2: indexForSelect2,
            });
        } else {
            setIndexesForSwap({
                swappedIndex1: swappedIndex1, 
                swappedIndex2: swappedIndex2
            });
        }
        const newAnimationForElements = getSwapAnimation(swappedIndex1, swappedIndex2);
        setAnimationForElements(newAnimationForElements);
    }, [currentAlgoState]);

    useEffect(() => {
        const {swappedIndex1, swappedIndex2} = indexesForSwap;
        const newAnimationForElements = getSwapAnimation(swappedIndex1, swappedIndex2);
        setAnimationForElements(newAnimationForElements);
    }, [indexesForSwap]);

    useEffect(() => {
        const {indexForSelect1, indexForSelect2} = indexesForSelect;

        let newAnimationForElements = {};
        newAnimationForElements[indexForSelect1] = {
            x: [0, 0, 0],
            y: [0, 5, 0],
            backgroundColor: "grey"
        };
        newAnimationForElements[indexForSelect2] = {
            x: [0, 0, 0],
            y: [0, 5, 0],
            backgroundColor: "grey"
        };

        setAnimationForElements(newAnimationForElements);
    }, [indexesForSelect]);

    let firstSetterSent = false;
    return <div className="elements_visualization">
        {
            currentArray.map((el, index) => {
                const {indexForSelect1, indexForSelect2} = indexesForSelect;
                const {swappedIndex1, swappedIndex2} = indexesForSwap;

                if (animationForElements[index]) {
                    {/* const animation = animationForElements[index];
                    if (index == swappedIndex1) {
                        return <AnimatedBox value={el} key={index} animation={animation} animationDuration={sortingSpeed} onAnimationComplete={() => setFirstAnimFinished()} />
                    } else if (index == swappedIndex2) {
                        return <AnimatedBox value={el} key={index} animation={animation} animationDuration={sortingSpeed} onAnimationComplete={() => setSecondAnimFinished()} />
                    } */}

                    let setterFuncion;
                    if (!firstSetterSent) {
                        firstSetterSent = true;
                        setterFuncion = () => setFirstAnimFinished(true);
                    } else {
                        setterFuncion = () => setSecondAnimFinished(true);
                    }

                    const animation = animationForElements[index];
                    return <AnimatedBox value={el} key={index} animation={animation} animationDuration={sortingSpeed} onAnimationComplete={() => setterFuncion()} />
                }
                else {
                    return <Box value={el} key={index}/>
                }
            })
        }
    </div>
}

const Box = ({value}) => {
    return <div className="num_box">{value}</div>
}

const AnimatedBox = ({value, animation, onAnimationComplete, animationDuration}) => {
    return <motion.div className="num_box" onAnimationComplete={() => onAnimationComplete()} animate ={{
        x: animation.x,
        y: animation.y,
        backgroundColor: animation.backgroundColor,
    }} transition = {{duration: animationDuration}}>
        {value}
    </motion.div>
}

const getSwapAnimation = (index1, index2) => {
    const boxWidth = 50;
    const boxMargin = 20;
    const xdir_index1 = (index1 > index2 ? -1 : 1)*Math.abs(index1-index2)*(boxWidth+2*boxMargin);
    const xdir_index2 = -xdir_index1;

    let animationForElementsByIndex = {};
    animationForElementsByIndex[index1] = {
        x: [0, 0, xdir_index1, xdir_index1],
        y: [0, -100, -100, 0],
        backgroundColor: "yellow"
    };
    animationForElementsByIndex[index2] = {
        x: [0, 0, xdir_index2, xdir_index2],
        y: [0, 100, 100, 0],
        backgroundColor: "yellow"
    };

    return animationForElementsByIndex;
}

const swapElements = (arr, index1, index2) => {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
}

export default AlgoVisualizer;