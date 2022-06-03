import "../styles/AlgoVisualizer.css";

import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";

export const BoxContainer = ({
    currentAlgoState,
    currentArray,
    setCurrentArray,
    setShouldUpdate,
    sortingSpeed,
}) => {
    const [firstAnimFinished, setFirstAnimFinished] = useState(false);
    const [secondAnimFinished, setSecondAnimFinished] = useState(false);
    const [animationForElements, setAnimationForElements] = useState([]);
    const [indexesForSwap, setIndexesForSwap] = useState({});
    const [indexesForSelect, setIndexesForSelect] = useState({});
    const [keyForRerender, setKeyForRerender] = useState(false);

    // When both animations are finished
    useEffect(() => {
        if (firstAnimFinished && secondAnimFinished) {
            console.log("both animations finished!");
            const { swappedIndex1, swappedIndex2 } = currentAlgoState;
            if (swappedIndex1 !== undefined) {
                const newCurrentArray = swapElements(
                    currentArray.slice(),
                    swappedIndex1,
                    swappedIndex2
                );
                setCurrentArray(newCurrentArray);
                setIndexesForSwap({});
                setKeyForRerender(!keyForRerender);
            }

            setFirstAnimFinished(false);
            setSecondAnimFinished(false);

            setShouldUpdate(true);
        }
    }, [firstAnimFinished, secondAnimFinished]);

    useEffect(() => {
        const { swappedIndex1, swappedIndex2 } = currentAlgoState;
        if (swappedIndex1 == undefined) {
            const { indexForSelect1, indexForSelect2 } = currentAlgoState;
            setIndexesForSelect({
                indexForSelect1: indexForSelect1,
                indexForSelect2: indexForSelect2,
            });
        } else {
            setIndexesForSwap({
                swappedIndex1: swappedIndex1,
                swappedIndex2: swappedIndex2,
            });
        }
        const newAnimationForElements = getSwapAnimation(
            swappedIndex1,
            swappedIndex2
        );
        setAnimationForElements(newAnimationForElements);
    }, [currentAlgoState]);

    useEffect(() => {
        const { swappedIndex1, swappedIndex2 } = indexesForSwap;
        const newAnimationForElements = getSwapAnimation(
            swappedIndex1,
            swappedIndex2
        );
        setAnimationForElements(newAnimationForElements);
    }, [indexesForSwap]);

    useEffect(() => {
        const { indexForSelect1, indexForSelect2 } = indexesForSelect;

        let newAnimationForElements = {};
        newAnimationForElements[indexForSelect1] = {
            x: [0, 0, 0],
            y: [0, 5, 0],
            backgroundColor: "grey",
        };
        newAnimationForElements[indexForSelect2] = {
            x: [0, 0, 0],
            y: [0, 5, 0],
            backgroundColor: "grey",
        };
        newAnimationForElements["duration"] = sortingSpeed / 2;

        console.log(newAnimationForElements);
        setAnimationForElements(newAnimationForElements);
    }, [indexesForSelect]);

    let firstSetterSent = false;
    return (
        <div className="elements_visualization_wrapper">
            <div
                className="elements_visualization"
                key={keyForRerender}
                style={
                    currentArray.length > 7 ? { justifyContent: "start" } : {}
                }
            >
                {currentArray.map((el, index) => {
                    if (animationForElements[index]) {
                        let setterFuncion;
                        if (!firstSetterSent) {
                            firstSetterSent = true;
                            setterFuncion = () => setFirstAnimFinished(true);
                        } else {
                            setterFuncion = () => setSecondAnimFinished(true);
                        }

                        const animation = animationForElements[index];
                        let { duration } = animationForElements;
                        duration =
                            duration == undefined ? sortingSpeed : duration;
                        return (
                            <AnimatedBox
                                value={el}
                                key={index}
                                animation={animation}
                                animationDuration={duration}
                                onAnimationComplete={() => setterFuncion()}
                            />
                        );
                    } else {
                        return <Box value={el} key={index} />;
                    }
                })}
            </div>
        </div>
    );
};

const Box = ({ value }) => {
    return <div className="num_box">{value}</div>;
};

const AnimatedBox = ({
    value,
    animation,
    onAnimationComplete,
    animationDuration,
}) => {
    return (
        <motion.div
            className="num_box"
            onAnimationComplete={() => onAnimationComplete()}
            animate={{
                x: animation.x,
                y: animation.y,
                backgroundColor: animation.backgroundColor,
            }}
            transition={{ duration: animationDuration }}
        >
            {value}
        </motion.div>
    );
};

const getSwapAnimation = (index1, index2) => {
    const boxWidth = 50;
    const boxMargin = 20;
    const xdirIndex1 =
        (index1 > index2 ? -1 : 1) *
        Math.abs(index1 - index2) *
        (boxWidth + 2 * boxMargin);
    const xdirIndex2 = -xdirIndex1;

    let animationForElementsByIndex = {};
    animationForElementsByIndex[index1] = {
        x: [0, 0, xdirIndex1, xdirIndex1],
        y: [0, -80, -80, 0],
        backgroundColor: "yellow",
    };
    animationForElementsByIndex[index2] = {
        x: [0, 0, xdirIndex2, xdirIndex2],
        y: [0, 80, 80, 0],
        backgroundColor: "yellow",
    };

    return animationForElementsByIndex;
};

const swapElements = (arr, index1, index2) => {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
};