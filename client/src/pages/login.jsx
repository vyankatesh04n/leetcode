/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 

const Login = () =>{

  const url = "https://leetcode-api-sandy.vercel.app";

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
      email: "",
      password: "",
  }); 

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name]: value,
      });
  };

  const handleError = (err) =>
      toast.error(err, {
          position: "bottom-left",
  });
  const handleSuccess = (msg) =>
      toast.success(msg, {
          position: "bottom-right",
  });

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          url + "/login",
          {
            ...inputValue, 
          },
          { withCredentials: true }
        );
        const { success, message} = data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.log(error);
      }
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
      }); 
  };

  return (
      <>
      <div className="bg-info-subtle min-vh-100 pt-5">
      <div className="containe text-center mb-5">
          <h2>Login</h2>
      </div>
      <div className="containe d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="mb-2">Email address</label>
                  <input onChange={handleOnChange} type="email" name="email" value={email} className="form-control mb-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="mb-2">Password</label>
                  <input onChange={handleOnChange} type="password" name="password" value={password} className="form-control mb-4" id="exampleInputPassword1" placeholder="Password"/>
              </div>
              <button type="submit" className="btn btn-primary">
                  Submit
              </button>
              <div className="mt-5">
                  New here? <Link to={"/signup"}>Signup</Link>
              </div>
          </form>
          <ToastContainer />
      </div>
      </div>
      </>
  )
}

export default Login ;