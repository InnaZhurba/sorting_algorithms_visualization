import { duration, IconButton, Slider } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import "../styles/AlgoDemo.css";
import React, { useContext, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const CurrentArrayContext = React.createContext({currentArray: [], setCurrentArray: () => {}});
const ArraySizeContext = React.createContext({arraySize: [], setArraySize: () => {}});
const CurrentInputContext = React.createContext({currentInput: [], setCurrentInput: () => {}});

//  Main component
const AlgoDemo = () => {
    const [currentArray, setCurrentArray] = useState([]);
    const [arraySize, setArraySize] = useState(5);
    const [currentInput, setCurrentInput] = useState('');
    
    return <div className="algo_demo">
        <CurrentArrayContext.Provider value={{currentArray: currentArray, setCurrentArray: (array) => setCurrentArray(array)}}>
        <ArraySizeContext.Provider value={{arraySize: arraySize, setArraySize: setArraySize}}>
        <CurrentInputContext.Provider value={{currentInput: currentInput, setCurrentInput: setCurrentInput}}>

            <InputField />
            <ArrayGenerator />
            <BoxContainer />
            <AlgoControls />

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

const ArrayGenerator = () => {
    const {setCurrentArray} = useContext(CurrentArrayContext);
    const {arraySize, setArraySize} = useContext(ArraySizeContext);
    const {setCurrentInput} = useContext(CurrentInputContext);

    const generateArray = () => {
        const generatedArray = Array.from({length: arraySize}, () => Math.floor(Math.random() * 100));
        setCurrentArray(generatedArray);        
        setCurrentInput(generatedArray.join([" "]));
    }

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

const AlgoControls = () => {
    return <div className="algo_navigation">
        <div className="slider_wrapper">
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </div>
        <div className="playback_control">        
            <IconButton><PlayArrowIcon/></IconButton>
            <IconButton><RestartAltIcon/></IconButton>
        </div>
    </div>
}

const Box = ({value}) => {
    return <div className="num_box">{value}</div>
}

const BoxContainer = () => {
    const {currentArray} = useContext(CurrentArrayContext);
    const index1 = 0;
    const index2 = 4;

    let animationForElementsByIndex = getSwapAnimation(index1, index2);

    return <div className="elements_visualization">
        {currentArray.map((el, index) => {
            if (animationForElementsByIndex[index]) {
                const {x, y} = animationForElementsByIndex[index];
                return <motion.div animate = {{
                    x: x,
                    y: y,
                }}>
                    <Box value={el} key={index}/>
                </motion.div>
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

export default AlgoDemo;