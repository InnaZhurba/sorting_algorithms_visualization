import { IconButton, Slider } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import "../styles/AlgoDemo.css";
import { useState } from "react";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const AlgoDemo = () => {
    const [currentArray, setCurrentArray] = useState([]);
    const [arraySize, setArraySize] = useState(0);
    const [currentInput, setCurrentInput] = useState('');
    
    return <div className="algo_demo">
        <InputField setCurrentArray={setCurrentArray} currentInput={currentInput} setCurrentInput={setCurrentInput}/>
        <ArrayGenerator arraySize={arraySize} setArraySize={setArraySize} setCurrentArray={setCurrentArray} setCurrentInput={setCurrentInput}/>
        <BoxContainer currentArray={currentArray}/>
        <AlgoControls />
    </div>
}

const InputField = ({setCurrentArray, currentInput, setCurrentInput}) => {
    return <div className="array_input">
                <input className="elements_input" value={currentInput} type="text" id="elements-input" onChange={(ev) => { 
                        setCurrentArray(ev.target.value.split(" "));
                        setCurrentInput(ev.target.value);
                    }}/>
            </div>
}

const ArrayGenerator = ({arraySize, setArraySize, setCurrentArray, setCurrentInput}) => {
    const generateArray = () => {
        const generatedArray = Array.from({length: arraySize}, () => Math.floor(Math.random() * 100));
        setCurrentArray(generatedArray);        
        setCurrentInput(generatedArray.join([" "]));
    }

    return <div className="size_generation">
        <div className="array_size">
            <label className="algo_description">Array size: </label>
            <input className="size_input" type="text" id="size-input" onChange={(ev) => {
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

const BoxContainer = ({currentArray}) => {
    return <div className="elements_visualization">
        {currentArray.map((el, index) => {return <Box value={el} key={index}/>})}
    </div>
}

export default AlgoDemo;