import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhotoForm from "../components/FormPhoto/FormPhoto.jsx";

const EditPhoto = () => {

    // Recupero lo slug dai parametri
    const { slug } = useParams();

    // Recupero useNavigate da react router dom
    const navigate = useNavigate();

    // useState della singola foto da editare
    const [dataToEdit, setDataToEdit] = useState(null);

    // Fecth dei dati della singola foto
    const fetchDataToEdit = async () => {
        const url = `/photos/${slug}`;
        const { data: p } = await axios.get(url);
        setDataToEdit({
            title: p.title,
            image: '',
            description: p.description,
            categories: p.categories.map(c => c.id),
            visible: p.visible
        });
    }

    useEffect(() => {
        fetchDataToEdit();
        return () => {
            setDataToEdit(null);
        }
    }, [slug]);

    // Funzione per l'update della foto
    const updatePhoto = async formData => {
        const res = await axios.put(`/photos/${slug}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (res.status < 400) {
            // Redirect alla foto appena modificata con messaggio di successo come stato
            navigate(`/photos/${res.data.slug}`, {
                state: { alert: { type: 'success', message: 'Foto modificata con successo!' } }
            });
        }
    }

    return (
        <>
            <section id="edit-photo-form" className="d-flex align-items-center flex-column justify-content-center wh-100">
                {dataToEdit === null ?
                    <div>Loading...</div>
                    :

                    // Form della foto
                    <PhotoForm
                        initialData={dataToEdit}
                        onSubmit={updatePhoto}
                    />
                }

                {/* Bottone per tornare indietro */}
                <Link to="../" relative="path" className="btn btn-secondary">Annulla</Link>
            </section>
        </>
    );
}

export default EditPhoto;