import "../styles/AlgoDemo.css";

import { IconButton, Slider } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Pause } from "@mui/icons-material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AlgoVisualizer = ({algorithm}) => {
    const [currentArray, setCurrentArray] = useState([]);
    const [currentAlgoState, setCurrentAlgoState] = useState({});
    const [shouldUpdate, setShouldUpdate] = useState(false);

    // Same as componentDidMount
    useEffect(() => {
        setCurrentArray([1, 3, 2, 6, 5, 1, 3, 2]);
    }, []);

    useEffect(() => {
        if (shouldUpdate) {
            console.log("running algorithm");
            const newAlgoState = algorithm({arr:currentArray.slice(), ...currentAlgoState});
            console.log(newAlgoState);
            setCurrentAlgoState(newAlgoState);
            
            setShouldUpdate(false);
        }
    }, [shouldUpdate]);

    return <div className="algo_demo">
        <InputField />
        <ArrayGenerator />
        <BoxContainer currentAlgoState={currentAlgoState} currentArray={currentArray} setCurrentArray={setCurrentArray} setShouldUpdate={setShouldUpdate}/>
        <AlgoControls setShouldUpdate={setShouldUpdate}/>
    </div>
}

const InputField = () => {
    return <div className="array_input">
                <input className="elements_input" type="text" id="elements-input"/>
            </div>
}

const ArrayGenerator = () => {
    return <div className="size_generation">
        <div className="array_size">
            <label className="algo_description">Array size: </label>
            <input className="size_input" type="text" id="size-input" />
        </div>
        <div className="generate_button_wrapper">
            <button className="generate_button" type="button">
                Generate
            </button>
        </div>
    </div>
}

const AlgoControls = ({setShouldUpdate}) => {
    const [buttonWasPressed, setButtonWasPressed] = useState(false);

    return <div className="algo_navigation">
        <div className="slider_wrapper">
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </div>
        <div className="playback_control">        
            { buttonWasPressed ? <IconButton onClick={() => {
                setButtonWasPressed(false)
                setShouldUpdate(false);
            }}><Pause /></IconButton> : <IconButton onClick={() => {
                setButtonWasPressed(true)
                setShouldUpdate(true);
                }}><PlayArrowIcon/></IconButton>}
            <IconButton><RestartAltIcon/></IconButton>
        </div>
    </div>
}

const BoxContainer = ({currentAlgoState, currentArray, setCurrentArray, setShouldUpdate}) => {
    const [firstAnimFinished, setFirstAnimFinished] = useState(false);
    const [secondAnimFinished, setSecondAnimFinished] = useState(false);
    const [animationForElements, setAnimationForElements] = useState([]);

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
        const {swappedIndex1, swappedIndex2} = currentAlgoState;
        const newAnimationForElements = getSwapAnimation(swappedIndex1, swappedIndex2);
        setAnimationForElements(newAnimationForElements);
    }, [currentAlgoState]);

    let firstSetterSent = false;
    return <div className="elements_visualization">
        {
            currentArray.map((el, index) => {
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
            })
        }
    </div>
}

const Box = ({value}) => {
    return <div className="num_box">{value}</div>
}

const AnimatedBox = ({value, animation, onAnimationComplete}) => {
    return <motion.div className="num_box" onAnimationComplete={() => onAnimationComplete()} animate ={{
        x: animation.x,
        y: animation.y,
    }} transition = {{duration: 1}}>
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

export default AlgoVisualizer;