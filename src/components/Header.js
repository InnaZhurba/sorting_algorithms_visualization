import "../styles/Header.css";

const Header = () => {

    return <header className="header">
        <h1 className="prj_header">Sorting Algorithms</h1>
        <div className="navigation">
            <a className="algo_type">Bubble</a>
            <a className="algo_type">Insertion</a>
            <a className="algo_type">Selection</a>
            <a className="algo_type">Quick</a>
            <a className="algo_type">Merge</a>
        </div>
    </header>
}

export default Header;