import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg bg-secondary-subtle px-5">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={'/'}>Album</NavLink>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/'}>Home</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;