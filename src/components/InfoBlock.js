import "../styles/InfoBlock.css"

const complexities = ["Worst", "Best", "Average"];

const InfoBlock = ({title, text, complexity}) => {
    complexity = typeof complexity === "undefined" ? ["-", "-", "-"] : complexity;

    return <div className="info_block">
        <h1 className="algo_name" id="algo-name">{title}</h1>
        <p className="algo_description" id="algo-description">
            {text}
        </p>

        <div className="complexity_block">
            <h2 className="complexity_title">Complexity</h2>
            {complexities.map((el, index) => {
                return <div className="complexity_type" key={index}>
                <p className="algo_description">{el}:&nbsp;</p>
                <p className="algo_description" id="worst-complexity">{complexity[index]}</p>
            </div>
            })}
        </div>
    </div>
}



export default InfoBlock;