import { useState } from "react";

const Signup = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <>
        {/* <Navbar/> */}
        <div className="bg-info-subtle min-vh-100 pt-5">
        <div className="containe text-center mb-5">
            <h2>sign up</h2>
        </div>
        <div className="containe d-flex justify-content-center align-items-center">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="mb-2">Email address</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" className="form-control mb-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-2">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control mb-4" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-2">Are you admin?</label>
                    <input onChange={e => setIsAdmin(e.target.value)} type="boolean" className="form-control mb-5" id="exampleInputIsAdmin" placeholder="true/ false"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={async (e) => {
                    e.preventDefault()
                    try{
                    const response = await fetch('http://localhost:3000/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            isAdmin: isAdmin
                        })
                    })
                    const json = await response.json();
                    console.log(json);
                    }
                    catch(error) {
                        console.error(error);
                    }
                    
                    }}>
                    Submit
                </button>
            </form>
        </div>
        </div>
        </>
    )
}

export default Signup;