/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const Problem = () => {

    const {id} = useParams();
    const [problem, setProblem] = useState([]);

    const init = async () => {
        const response = await fetch('http://localhost:3000/question/' + id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        setProblem(json);
    }

    useEffect(() => {
        init();
    }, []);
    

    return(
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h4 className="mt-5">{problem.title}</h4>
                    <hr /> 
                    {problem.io?.map((io, index) => (
                        <div key={index}>
                            <h5 className="my-5">Example {index+1}</h5>
                            <h6>Input: {io.input.join(' ')}</h6>
                            <h6 className="mb-3">Output:  {io.output}</h6>
                        </div>
                    ))}
                </div>
                <div className="col-6">
                    <div className="col-3 my-3">
                        <select className = "form-select" aria-label="Default select example">
                            <option value="1">C++</option>
                            <option value="2">Java</option>
                            <option value="3">Python</option>
                        </select>
                    </div>
                        <textarea rows={20} cols={50}></textarea>
                        <div>
                            <button type="submit" className="btn btn-primary my-3">Submit</button>
                        </div>
                </div>
            </div>        
        </div>
    )
}