import { Link, useLocation } from "react-router-dom";

import "../styles/Header.css";

const links = {
    "/bubble": "Bubble",
    "/insertion": "Insertion",
    "/selection": "Selection",
    "/quick": "Quick",
    "/merge": "Merge",
};

const Header = ({highlightedLink}) => {

    return <header className="header">
        <h1 className="prj_header">Sorting Algorithms</h1>
        <div className="navigation">
            {   
                Object.entries(links).map((el, index) => {
                    const [key, value] = el;
                    if (key === highlightedLink) {
                        return <Link to={key} className="algo_type highlighted" key={index}>{value}</Link>    
                    } else {
                        return <Link to={key} className="algo_type" key={index}>{value}</Link>
                    }
                })
            }
        </div>
    </header>
}

export default Header;