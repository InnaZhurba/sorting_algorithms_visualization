import { duration, IconButton, Slider } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import "../styles/AlgoDemo.css";
import React, { useContext, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Pause } from "@mui/icons-material";

const CurrentArrayContext = React.createContext({currentArray: [], setCurrentArray: () => {}});
const ArraySizeContext = React.createContext({arraySize: [], setArraySize: () => {}});
const CurrentInputContext = React.createContext({currentInput: [], setCurrentInput: () => {}});

//  Main component
const AlgoDemo = ({algorithm}) => {
    const [currentArray, setCurrentArray] = useState([]);
    const [arraySize, setArraySize] = useState(5);
    const [currentInput, setCurrentInput] = useState('');
    const [shouldRun, setShouldRun] = useState(false);
    const [currentAlgoState, setCurrentAlgoState] = useState({arr: []});

    const generateArray = () => {
        const generatedArray = Array.from({length: arraySize}, () => Math.floor(Math.random() * 100));
        setCurrentArray(generatedArray);        
        setCurrentInput(generatedArray.join([" "]));
    }

    // Same as componentDidMount
    useEffect(() => {
        generateArray();
    }, []);

    useEffect(() => {
        if (shouldRun) {
            console.log("Algorithm should run");
            currentAlgoState.arr = currentArray.slice();
            const newAlgoState = algorithm(currentAlgoState);
            // setCurrentArray(newAlgoState.arr.slice());
            setShouldRun(false);
            setCurrentAlgoState(newAlgoState);
        }

    }, [shouldRun]);

    useEffect(() => {
        currentAlgoState.arr = currentArray.slice();
        console.log(currentAlgoState.arr);
        setCurrentAlgoState(currentAlgoState);
    }, [currentArray]);
    
    return <div className="algo_demo">
        <CurrentArrayContext.Provider value={{currentArray: currentArray, setCurrentArray: (array) => setCurrentArray(array)}}>
        <ArraySizeContext.Provider value={{arraySize: arraySize, setArraySize: setArraySize}}>
        <CurrentInputContext.Provider value={{currentInput: currentInput, setCurrentInput: setCurrentInput}}>

            <InputField />
            <ArrayGenerator generateArray={generateArray}/>
            <BoxContainer shouldRun={shouldRun} setShouldRun={setShouldRun} currentAlgoState={currentAlgoState} />
            <AlgoControls shouldRun={shouldRun} setShouldRun={setShouldRun}/>

        </CurrentInputContext.Provider>
        </ArraySizeContext.Provider>
        </CurrentArrayContext.Provider>
    </div>
}

const InputField = () => {
    const {setCurrentArray} = useContext(CurrentArrayContext);
    const {currentInput, setCurrentInput} = useContext(CurrentInputContext);

    return <div className="array_input">
                <input className="elements_input" value={currentInput} type="text" id="elements-input" onChange={(ev) => { 
                        setCurrentArray(ev.target.value.split(" "));
                        setCurrentInput(ev.target.value);
                    }}/>
            </div>
}

const ArrayGenerator = ({generateArray}) => {
    const {setCurrentArray} = useContext(CurrentArrayContext);
    const {arraySize, setArraySize} = useContext(ArraySizeContext);
    const {setCurrentInput} = useContext(CurrentInputContext);

    return <div className="size_generation">
        <div className="array_size">
            <label className="algo_description">Array size: </label>
            <input className="size_input" value={arraySize} type="text" id="size-input" onChange={(ev) => {
                const parsedInt = parseInt(ev.target.value);
                setArraySize(isNaN(parsedInt) ? 0 : parsedInt);
                }} />
        </div>
        <div className="generate_button_wrapper">
            <button className="generate_button" type="button" onClick={() => {generateArray()}}>
                Generate
            </button>
        </div>
    </div>
}

const AlgoControls = ({shouldRun, setShouldRun}) => {
    return <div className="algo_navigation">
        <div className="slider_wrapper">
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </div>
        <div className="playback_control">        
            { shouldRun ? <IconButton onClick={() => setShouldRun(false)}><Pause /></IconButton> : <IconButton onClick={() => setShouldRun(true)}><PlayArrowIcon/></IconButton> }
            <IconButton><RestartAltIcon/></IconButton>
        </div>
    </div>
}

const Box = ({value}) => {
    return <div className="num_box">{value}</div>
}

const AnimatedBox = ({value, animation, onAnimationComplete}) => {
    return <motion.div className="num_box" onAnimationComplete={() => onAnimationComplete()} animate ={{
        x: animation.x,
        y: animation.y,
    }} transition = {{duration: 3}}>
        {value}
    </motion.div>
}

const BoxContainer = ({setShouldRun, currentAlgoState}) => {
    const {currentArray, setCurrentArray} = useContext(CurrentArrayContext);
    const [firstAnimFinished, setFirstAnimFinished] = useState(false);
    const [secondAnimFinished, setSecondAnimFinished] = useState(false);
    const [animationForElements, setAnimationForElements] = useState([]);
    const [arrayForAnimation, setArrayForAnimation] = useState([]);

    useEffect(() => {
        if (firstAnimFinished && secondAnimFinished) {
            console.log("both animations finished!");
            setFirstAnimFinished(false);
            setSecondAnimFinished(false);

            const {index1, index2} = currentAlgoState;
            const swappedArray = swapElements(currentArray, index1, index2);
            setArrayForAnimation(swappedArray);
            setCurrentArray(swappedArray);
            setShouldRun(true);
        }
    }, [firstAnimFinished, secondAnimFinished]);

    useEffect(() => {
        const {swappedIndex1, swappedIndex2, arr} = currentAlgoState;
        const newAnimationForElements = getSwapAnimation(swappedIndex1, swappedIndex2);
        setAnimationForElements(newAnimationForElements);
    }, [currentAlgoState]);

    useEffect(() => {
        console.log("Set array for animation: "+currentArray);
        setArrayForAnimation(currentArray);
    }, [currentArray]);

    let firstSetterSent = false;
    return <div className="elements_visualization">
        {arrayForAnimation.map((el, index) => {
            if (animationForElements[index]) {
                let setterFuncion;
                if (!firstSetterSent) {
                    firstSetterSent = true;
                    setterFuncion = () => setFirstAnimFinished(true);
                } else {
                    setterFuncion = () => setSecondAnimFinished(true);
                }

                const animation = animationForElements[index];
                return <AnimatedBox value={el} key={index} animation={animation} onAnimationComplete={() => setterFuncion()} />
            }
            else {
                return <Box value={el} key={index}/>
            }
            
            })}
    </div>
}


const getSwapAnimation = (index1, index2) => {
    const boxWidth = 50;
    const boxMargin = 20;
    const xdir_index1 = (index1 > index2 ? -1 : 1)*Math.abs(index1-index2)*(boxWidth+2*boxMargin);
    const xdir_index2 = -xdir_index1;

    let animationForElementsByIndex = {};
    animationForElementsByIndex[index1] = {
        x: [0, 0, xdir_index1, xdir_index1],
        y: [0, -100, -100, 0]
    };
    animationForElementsByIndex[index2] = {
        x: [0, 0, xdir_index2, xdir_index2],
        y: [0, 100, 100, 0]
    };

    return animationForElementsByIndex;
}

const swapElements = (arr, index1, index2) => {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
}


export default AlgoDemo;