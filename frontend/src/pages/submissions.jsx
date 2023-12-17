/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export const Submissions = () => {
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [email , setEmail] = useState('');

    const init = async () => {
        try{
            const response = await axios.get('http://localhost:3000/submissions/'+ email);
            console.log(email);
            setProblems(response.data);
        } catch(error) {
            console.error('Error fetching data:', error.response.data);
        }
    }

    useEffect(() => {
        const verifyCookie = async () => {
            try{
                if (!cookies.token) {
                    navigate("/login");
                }
                const { data } = await axios.post(
                    "http://localhost:3000",
                    {},
                    { withCredentials: true }
                );
                const { status, email } = data;
                return status
                    ? setEmail(email)
                    : (removeCookie("token"), navigate("/login"));
            } catch(error) {
                console.error('Error fetching data:', error.response.data);
            } 
        }                     
        const initAfterVerification = async () => {
            await verifyCookie(); // Wait for verifyCookie to complete
            init(); // Call init() after verifyCookie completes
        };

        initAfterVerification();
    }, [email]);

    // console.log(userName);

    return (
        <>
        {/* {userName ? ( */}
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
                                    <a href={`/submission/${email}/${index}`}>
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
        {/* ) : null} */}
        </>
    )        
}