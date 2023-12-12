/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

export const ProblemList = ({ userName}) => {
    const [problems, setProblems] = useState([]);

    const init = async () => {
        try{
            const response = await axios.get('http://localhost:3000/questions');
            setProblems(response.data);
        } catch(error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        {userName} ? (
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
        ) : null
    )        
}