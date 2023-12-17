/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const Problem = () => {

    const languages = ['C++', 'Java', 'Python'];
    const {id} = useParams();
    const [problem, setProblem] = useState([]);
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [selectedLanguage, setSelectedLanguage] = useState('C++');
    const [code, setCode] = useState('');
    const [email , setEmail] = useState('');

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/submit-code', {
                code,
                lang: selectedLanguage,
                qid: parseInt(id),
                email
            },
            { withCredentials: true }
            );
            console.log(response.data);
            if (response.data.isAccepted){
                toast.success('Accepted', {
                    position: "bottom-right",
                });
                setTimeout(() => {
                    navigate('/');
                }, 3000); 
            } else {
                toast.error('Wrong Answer', {
                    position: "bottom-right",
                });
            }

        } catch(error) {
            toast.error(error, {
                position: "bottom-right",
            });
            console.error('Error fetching data:', error);
        }
    }

    const init = async () => {
        try{
            const response = await axios.get('http://localhost:3000/question/' + id)
            setProblem(response.data);
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
              "http://localhost:3000",
              {},
              { withCredentials: true }
            );
            const { status, email } = data;
            return status
              ? setEmail(email)
              : (removeCookie("token"), navigate("/login"));
            };
            verifyCookie();
        init();
    }, []);
    

    return(
        // {userName}?(
        <>
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
                        <select className = "form-select" aria-label="Default select example" value={selectedLanguage} onChange={handleLanguageChange}>
                        {languages.map((language) => (
                            <option key={language} value={language}>
                            {language}
                            </option>
                        ))}
                        </select>
                    </div>
                        <textarea value={code} onChange={handleCodeChange} rows={20} cols={50}></textarea>
                        <div>
                            <button type="submit" className="btn btn-primary my-3" onClick={handleSubmit}>Submit</button>
                        </div>
                </div>
            </div> 
            <ToastContainer/>       
        </div>
        </>
        // ): null
    )
}