import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { FaUsers as UsersIcon } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {

    const { register } = useAuth();

    const initialData = {
        name: '',
        email: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialData);

    const [registerError, setRegisterError] = useState(null);

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await register(formData);
            setFormData(initialData);
        } catch (err) {
            setRegisterError(err);
        }
    }

    return (<>
        <section id="register" className="d-flex justify-content-center align-items-center">
            <div className="card w-25">
                <div className="card-header">
                    <div className="card-title text-center">
                        <h1 className="h2 m-0 d-flex align-items-center justify-content-center gap-2"><UsersIcon /><span>Register</span></h1>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label h5">Nome</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nome"
                                value={formData.name}
                                onChange={e => changeData('name', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label h5">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={e => changeData('email', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label h5">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={e => changeData('password', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        {registerError !== null && <div className="text-danger">{registerError.message}</div>}
                        {registerError?.errors && registerError.errors.map((err, index) => (
                            <div key={`err${index}`}>{err.msg}</div>
                        ))}

                        <div className="d-flex align-items-center flex-column gap-2">
                            <button className="btn btn-primary">Register</button>
                            <Link to={'/login'}>Hai già un account? Loggati!</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>)
}

export default Register;