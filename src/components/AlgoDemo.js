import { IconButton, Slider } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import "../styles/AlgoDemo.css";

const AlgoDemo = () => {
    return <div className="algo_demo">
        <InputField />
        <ArrayGenerator />
        <BoxContainer />
        <AlgoControls />
    </div>
}

const InputField = () => {
    return <div className="array_input">
                <input className="elements_input" type="text" id="elements-input" />
            </div>
}

const ArrayGenerator = () => {
    return <div className="size_generation">
        <div className="array_size">
            <label className="algo_description">Array size:&nbsp;</label>
            <input className="size_input" type="text" id="size-input" />
        </div>
        <div className="generate_button_wrapper">
            <button className="generate_button" type="button">
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

const Box = () => {
    return <div className="num_box">1</div>
}

const BoxContainer = () => {
    return <div className="elements_visualization">
        <Box />
        <Box />
        <Box /> 
    </div>
}

export default AlgoDemo;