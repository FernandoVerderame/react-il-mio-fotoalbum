import footerStyle from './Footer.module.scss';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className="bg-black">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="text-white">Made by <i>Fernando Verderame</i>.</div>
                    <ul className="d-flex list-unstyled gap-3 m-0 fs-4">
                        <li>
                            <a
                                href="https://www.instagram.com/_fernandoverderame_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white"
                            >
                                <FaInstagram />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/fernando-verderame-smm/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white"
                            >
                                <FaLinkedin />
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
}

export default Footer;