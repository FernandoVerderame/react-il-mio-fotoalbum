import axios from "../utils/axiosClient.js";
import FormCategory from "../components/FormCategory/FormCategory.jsx";
import { Link, useNavigate } from "react-router-dom";

const CreateCategory = () => {

    // Recupero useNavigate da react router dom
    const navigate = useNavigate();

    // Chiamata api per la creazione di una categoria
    const createCategory = async formData => {
        const res = await axios.post('/categories', formData);

        // Redirect alla tabella delle categorie
        if (res.status < 400) {
            navigate('/categories', {
                state: { alert: { type: 'success', message: 'Categoria creata con successo!' } }
            });
        }
    }

    return (
        <section id="create-category" className="d-flex align-items-center flex-column">

            {/* Form della categoria */}
            <FormCategory
                onSubmit={createCategory}
            />

            {/* Bottone per tornare indietro */}
            <Link to="../" relative="path" className="btn btn-secondary mt-4">Torna indietro</Link>
        </section>
    );
}

export default CreateCategory;