import axios from "../utils/axiosClient.js";
import FormContact from "../components/FormContact/FormContact.jsx";
import Alert from '../components/Alert/Alert.jsx';
import { useState } from "react";

const Home = () => {

    // useState Alert
    const [alert, setAlert] = useState(null);

    // Chiamata per la creazione del messaggio
    const createMessage = async formData => {
        const res = await axios.post('/messages', formData);

        if (res.status < 400) {
            setAlert({ type: 'success', message: `Messaggio inviato con successo!` });
        }
    }

    return (
        <div>

            {/* Jumbotron */}
            <section id="jumbotron">
                <h1 className="text-white mb-0">"Capture the moment!"</h1>
            </section>

            <div className="container">

                {/* Mostra l'alert se esiste */}
                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}

                {/* Form di contatto */}
                <FormContact
                    onSubmit={createMessage}
                />

            </div>
        </div>
    );
}

export default Home;