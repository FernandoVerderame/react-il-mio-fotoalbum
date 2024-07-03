import axios from "../../utils/axiosClient.js";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from '../../assets/images/logo.jpeg';
import navbarStyle from './Navbar.module.scss';
import { FaMessage as MessageIcon } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Navbar = () => {

    const { isLoggedIn, logout, user } = useAuth();

    // useState counter del messaggi
    const [messageCount, setMessageCount] = useState(0);

    // Fetch dei messaggi
    const fetchMessageCount = async () => {
        const res = await axios.get(`/messages`);
        setMessageCount(res.data.messageCount);
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetchMessageCount();
        }
    }, [isLoggedIn]);

    return (
        <header>
            <nav className="navbar navbar-expand-lg px-5">
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
                                    className={({ isActive }) => `nav-link ${isActive ? navbarStyle.active : ''}`}
                                    to={'/'}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive ? navbarStyle.active : ''}`}
                                    to={'/photos'}>Album</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive ? navbarStyle.active : ''}`}
                                    to={'/categories'}>Categorie</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="right-nav w-25 d-flex justify-content-end">
                        {isLoggedIn &&
                            <div className={navbarStyle.notifications}>
                                <NavLink
                                    className={({ isActive }) => `text-black ${isActive ? navbarStyle.active : ''}`}
                                    to={'/messages'}>
                                    <MessageIcon />
                                    <div className={navbarStyle.numberNot}>{messageCount}</div>
                                </NavLink>
                            </div>
                        }
                        {!isLoggedIn &&
                            <div className="d-flex gap-2">
                                <NavLink to={'/login'} className="btn btn-primary btn-sm">Login</NavLink>
                                <NavLink to={'/register'} className="btn btn-secondary btn-sm">Register</NavLink>
                            </div>
                        }
                        {isLoggedIn &&
                            <div className="d-flex align-items-center gap-2">
                                <h3 className="m-0 fs-5">{user.name}</h3>
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