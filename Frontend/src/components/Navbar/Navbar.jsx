import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from '../../assets/images/logo.jpeg';
import navbarStyle from './Navbar.module.scss';

const Navbar = () => {

    const { isLoggedIn, logout, user } = useAuth();

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-black px-5">
                <div className="container-fluid">
                    <div className="left-nav w-25">
                        <NavLink className="navbar-brand text-white d-flex align-items-center" to={'/'}>
                            <img src={logo} alt="logo" className={navbarStyle.logo} />
                        </NavLink>
                    </div>
                    <div className="center-nav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5 d-flex gap-3">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link text-white ${isActive ? navbarStyle.active : ''}`}
                                    to={'/'}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link text-white ${isActive ? navbarStyle.active : ''}`}
                                    to={'/photos'}>Album</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link text-white ${isActive ? navbarStyle.active : ''}`}
                                    to={'/categories'}>Categorie</NavLink>
                            </li>
                            {isLoggedIn &&
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) => `nav-link text-white ${isActive ? navbarStyle.active : ''}`}
                                        to={'/messages'}>Messaggi</NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                    <div className="right-nav w-25 d-flex justify-content-end">
                        {!isLoggedIn &&
                            <div className="d-flex gap-2">
                                <NavLink to={'/login'} className="btn btn-primary btn-sm">Login</NavLink>
                                <NavLink to={'/register'} className="btn btn-secondary btn-sm">Register</NavLink>
                            </div>
                        }
                        {isLoggedIn &&
                            <div className="d-flex align-items-center gap-2">
                                <h3 className="m-0 fs-6 text-white">{user.name}</h3>
                                <button onClick={logout} className="btn btn-secondary btn-sm">Logout</button>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </header >
    );
}

export default Navbar;