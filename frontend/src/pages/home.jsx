// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer } from "react-toastify";
/* eslint-disable react/prop-types */

const Home = ({ userName}) => {
  // const navigate = useNavigate();
  // const [cookies, removeCookie] = useCookies([]);
  // const [username, setUsername] = useState("");
  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     if (!cookies.token) {
  //       navigate("/login");
  //     }
  //     const { data } = await axios.post(
  //       "http://localhost:3000",
  //       {},
  //       { withCredentials: true }
  //     );
  //     const { status, user } = data;
  //     setUsername(user);
  //     return status
  //       ? console.log("success")
  //       : (removeCookie("token"), navigate("/login"));
  //   };
  //   verifyCookie();
  // }, [cookies, navigate, removeCookie]);
  // const Logout = () => {
  //   removeCookie("token");
  //   navigate("/login");
  // };
  return (
    <>
      <div className="bg-info-subtle min-vh-100 pt-5 containe text-center mb-5">
        <h4 className="pt-5">
          {/* {" "} */}
          Welcome <span className="text-success">{userName}</span> 
        </h4>
        {/* <button className="btn btn-danger mt-3" onClick={Logout}>LOGOUT</button> */}
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Home;