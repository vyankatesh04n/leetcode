export const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ms-4">
                <a className="navbar-brand" href="#">
                <img src="../src/assets/leetcode.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-1"></img>
                    Leetcode
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item me-5">
                            <a className="nav-link" href="signup">Log in</a>
                        </li>
                        <li className="nav-item me-5">
                            <a className="nav-link" href="login">Sign up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}