/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function Navbar ({ userName})  {
    
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [changedName, setChangedName] = useState(userName);

    const isChanged = () => {
        if (changedName !== userName) {
            userName = changedName;
        }
    }

    useEffect(() => {
        const verifyCookie = async () => {
        if (!cookies.token) {
            setChangedName("");
            navigate("/login");
        }
        const { data } = await axios.post(
            "http://localhost:3000",
            {},
            { withCredentials: true }
        );
        const { status, user } = data;
        setChangedName(user);
        return status
            ? console.log("success")
            : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
        isChanged();
        navigate("/login");
    };

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ms-4">
                <a className="navbar-brand" href="/">
                <img src="../src/assets/leetcode.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-1"></img>
                    Leetcode
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {{userName} ? 
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
                        :  null}
                    </div>
                  
                
                {/* else{
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-5">
                                <a className="nav-link" href="login">Log in</a>
                            </li>
                            <li className="nav-item me-5">
                                <a className="nav-link" href="signup">Sign up</a>
                            </li>
                        </ul>
                    </div>
                } */}
            </div>
        </nav>
        </>
    )
}

export default Navbar;