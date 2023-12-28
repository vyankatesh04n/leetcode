/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export const QnSub = () => {
    const url = "https://leetcode-liart.vercel.app";

    const [submissions, setSubmissions] = useState([]);
    const {email, qid} = useParams();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    const init = async () => {
        try{
            const response = await axios.get(url + "/submissions/" + email + "/" + qid);
            console.log(response.data);
            setSubmissions(response.data);
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
                    url,
                    {},
                    { withCredentials: true }
                );
                const { status, email } = data;
                return status
                    ? console.log(email)
                    : (removeCookie("token"), navigate("/login"));
            } catch(error) {
                console.error('Error fetching data:', error.response.data);
            } 
        }                     
        const initAfterVerification = async () => {
            await verifyCookie();
            init();
        };

        initAfterVerification();
    }, []);

    return (
        <>
        <div className="container-fluid bg-info-subtle min-vh-100 pt-5">
            <div className="container">
                <table className=" table table-bordered table-striped">
                    <thead className="text-center">
                        <tr>
                            <th>Language</th>
                            <th>Code</th>
                            <th>Acceptance</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {submissions.map((submission, index) => (
                            <tr key={index}>
                                <td>
                                        {submission.lang}
                                </td>
                                <td>{submission.code}</td>
                                {submission.isAccepted ? <td className="text-success">Accepted</td> : <td className="text-danger">Not Accepted</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )        
}