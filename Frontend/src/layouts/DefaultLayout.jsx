import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const DefaultLayout = () => {
    return (
        <div className="wrapper">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default DefaultLayout;