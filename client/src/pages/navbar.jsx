/* eslint-disable react/prop-types */
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar ({ onUserNameChange})  {
    
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [showNavbar, setShowNavbar] = useState(false);

    const handleClick = () => {
        setShowNavbar(!showNavbar);
    };

    const Logout = () => {
        removeCookie("token");
        onUserNameChange("");
        navigate("/login");
    };

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ms-4">
                <a className="navbar-brand" href="/">
                <img src="../src/assets/leetcode.png"  width="30" height="24" className="d-inline-block align-text-top me-1"></img>
                    Leetcode
                </a>
                <button onClick={handleClick} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    <div className={`collapse navbar-collapse ${showNavbar ? 'show' : ''}`} id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item me-5">
                                    <a className="nav-link" href="/problems">Problems</a>
                                </li>
                                <li className="nav-item me-5">
                                    <a className="nav-link" href="/submissions">submissions</a>
                                </li>
                                <li className="nav-item me-5">
                                    <button className="nav-link" onClick={Logout} >logout</button>
                                </li>
                            </ul>
                    </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;