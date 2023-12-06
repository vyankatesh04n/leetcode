/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
export const ProblemList = () => {
    const [problems, setProblems] = useState([]);

    const init = async () => {
        const response = await fetch('http://localhost:3000/questions',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        setProblems(json);
    }

    useEffect(() => {
        init();
    }, []);

    return (
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
    )        
}