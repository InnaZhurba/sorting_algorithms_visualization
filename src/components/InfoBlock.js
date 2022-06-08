import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/InfoBlock.css";

const complexities = ["Worst", "Best", "Average"];

const InfoBlock = ({ title }) => {
    const [descr, setDescr] = useState("");
    const [compl, setCompl] = useState([]);

    const location = useLocation();

    const titleName = title.split(" ")[0];

    useEffect(() => {
        fetch("http://localhost:3004/" + titleName)
            .then((response) => response.json())
            .then((algorithm) => {
                setDescr(algorithm.description);
                setCompl(algorithm.complexities);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [location]);

    return (
        <div className="info_block">
            <div className="description_block">
                <h1 className="algo_name" id="algo-name">
                    {title}
                </h1>
                <p className="algo_description" id="algo-description">
                    {descr}
                </p>
            </div>
            <div className="complexity_block">
                <h2 className="complexity_title">Complexity</h2>
                {complexities.map((el, index) => {
                    return (
                        <div className="complexity_type" key={index}>
                            <p className="algo_description">{el}:&nbsp;</p>
                            <p
                                className="algo_description"
                                id="worst-complexity"
                            >
                                {compl[index]}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InfoBlock;
