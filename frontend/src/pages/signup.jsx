export const Login = () => {

    return (
        <div className="bg-info-subtle min-vh-100 pt-5">
        <div className="containe text-center mb-5">
            <h2>sign-up</h2>
        </div>
        <div className="containe d-flex justify-content-center align-items-center">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="mb-2">Email address</label>
                    <input type="email" className="form-control mb-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="mb-2">Password</label>
                    <input type="password" className="form-control mb-5" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    )
}