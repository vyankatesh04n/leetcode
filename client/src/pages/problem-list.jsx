/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export const ProblemList = () => {
    const url = "https://leetcode-server-n9qv.onrender.com";

    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    const init = async () => {
        try{
            const response = await axios.get(url + '/questions');
            setProblems(response.data);
        } catch(error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
              navigate("/login");
            }
            const { data } = await axios.post(
              url,
              {},
              { withCredentials: true }
            );
            const { status, user } = data;
            return status
              ? console.log(user)
              : (removeCookie("token"), navigate("/login"));
            };
            verifyCookie();
        init();
    }, []);

    return (
        <>
        <div className="container-fluid bg-info-subtle min-vh-100 pt-5">
            <div className="container">
                <table className=" table table-bordered table-striped">
                    <thead className="text-center">
                        <tr>
                            <th>Title</th>
                            <th>Difficulty</th>
                            <th>Acceptance</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {problems.map((problem, index) => (
                            <tr key={index}>
                                <td>
                                    <a href={`/problem/${index}`}>
                                        {problem.title}
                                    </a>
                                </td>
                                <td>{problem.difficulty}</td>
                                <td>{problem.acceptance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )        
}