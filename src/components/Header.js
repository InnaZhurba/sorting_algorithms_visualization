import { Link } from "react-router-dom";

import "../styles/Header.css";

const Header = () => {

    return <header className="header">
        <h1 className="prj_header">Sorting Algorithms</h1>
        <div className="navigation">
            <Link to="bubble" className="algo_type">Bubble</Link>
            <Link to="insertion" className="algo_type">Insertion</Link>
            <Link to="selection" className="algo_type">Selection</Link>
            <Link to="quick" className="algo_type">Quick</Link>
            <Link to="merge" className="algo_type">Merge</Link>
        </div>
    </header>
}

export default Header;