import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {

    const { isLoggedIn, logout, user } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-secondary-subtle px-5">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={'/'}>Album</NavLink>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/'}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/photos'}>Foto</NavLink>
                    </li>
                </ul>
                {!isLoggedIn &&
                    <NavLink to={`/login`} className="btn btn-primary">Login</NavLink>
                }
                {isLoggedIn &&
                    <div className="d-flex align-items-center gap-2">
                        <h3 className="m-0 fs-5">{user.name}</h3>
                        <button onClick={logout} className="btn btn-secondary">Logout</button>
                    </div>
                }
            </div>
        </nav>
    );
}

export default Navbar;