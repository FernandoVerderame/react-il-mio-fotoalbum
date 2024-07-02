import axios from "../utils/axiosClient.js";
import PhotoForm from "../components/FormPhoto/FormPhoto.jsx";
import { Link, useNavigate } from "react-router-dom";

const CreatePhoto = () => {

    // Recupero useNavigate da react router dom
    const navigate = useNavigate();

    // Chiamata api per la creazione di una foto
    const createPhoto = async formData => {
        const res = await axios.post(`/photos`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (res.status < 400) {
            // Redirect alla foto appena creata con messaggio di successo come stato
            navigate(`/photos/${res.data.slug}`, {
                state: { alert: { type: 'success', message: 'Foto creata con successo!' } }
            });
        }
    }

    return (
        <section id="create-photo-form" className="d-flex align-items-center flex-column">

            {/* Form della foto */}
            <PhotoForm
                onSubmit={createPhoto}
            />

            {/* Bottone per tornare indietro */}
            <Link to="../" relative="path" className="btn btn-secondary">Torna indietro</Link>
        </section>
    );
}

export default CreatePhoto;