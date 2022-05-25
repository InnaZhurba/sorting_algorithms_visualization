import "../styles/InfoBlock.css"

const InfoBlock = () => {
    return <div className="info_block">
    <h1 className="algo_name" id="algo-name">Bubble</h1>
    <p className="algo_description" id="algo-description">
        Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until
        the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list. 
    </p>

    <div className="complexity_block">
        <h2 className="complexity_title">Complexity</h2>
        <div className="complexity_type">
            <p className="algo_description">Worst:&nbsp;</p>
            <p className="algo_description" id="worst-complexity">O(n^2)</p>
        </div>
        <div className="complexity_type">
            <p className="algo_description">Best:&nbsp;</p>
            <p className="algo_description" id="best-complexity">O(n)</p>
        </div>
        <div className="complexity_type">
            <p className="algo_description">Average:&nbsp;</p>
            <p className="algo_description" id="average-complexity">O(n^2)</p>
        </div>
    </div>
    </div>
}



export default InfoBlock;