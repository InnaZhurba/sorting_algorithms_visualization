import "../styles/AlgoVisualizer.css";

import React, { useContext, useEffect, useState } from "react";
import { PlayStatusContext } from "./AlgoVisualizer";

export const ArrayGenerator = ({
    generateArray,
    arraySizeForGen,
    setArraySizeForGen,
}) => {
    const { isPlaying } = useContext(PlayStatusContext);
    return (
        <div className="size_generation">
            <div className="array_size">
                <label className="array_size_text">Array size: </label>
                <input
                    className="size_input"
                    type="text"
                    id="size-input"
                    value={arraySizeForGen}
                    onChange={(ev) => {
                        if (!isPlaying) {
                            const parsedInt = parseInt(ev.target.value);
                            setArraySizeForGen(
                                isNaN(parsedInt) ? 0 : parsedInt
                            );
                        }
                    }}
                />
            </div>
            <div className="generate_button_wrapper">
                <button
                    className="generate_button"
                    type="button"
                    onClick={() => {
                        if (!isPlaying) {
                            generateArray();
                        }
                    }}
                >
                    Generate
                </button>
            </div>
        </div>
    );
};
