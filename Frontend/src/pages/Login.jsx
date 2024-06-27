import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const Login = () => {

    const { login } = useAuth();

    const initialData = {
        email: 'johndoe@example.com',
        password: 'securepassword123'
    }

    const [formData, setFormData] = useState(initialData);

    const [loginError, setLoginError] = useState(null);

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    const handleLogin = async e => {
        e.preventDefault();
        try {
            await login(formData);
            setFormData(initialData);
        } catch (err) {
            setLoginError(err);
        }
    }

    return (<>
        <section id="login" className="d-flex justify-content-center mt-5">
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => changeData('email', e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={e => changeData('password', e.target.value)}
                />
                {loginError !== null && <div className="text-danger">{loginError.message}</div>}
                {loginError?.errors && loginError.errors.map((err, index) => (
                    <div key={`err${index}`}>{err.msg}</div>
                ))}
                <button>Loggati</button>
            </form>
        </section>
    </>)
}

export default Login;