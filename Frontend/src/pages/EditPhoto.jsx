import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhotoForm from "../components/Form/Form.jsx";

const EditPhoto = () => {

    const { slug } = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

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

    const updatePhoto = async formData => {
        const res = await axios.put(`/photos/${slug}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (res.status < 400) {
            navigate(`/photos/${res.data.slug}`);
        }
    }

    return (
        <>
            <section id="form" className="d-flex align-items-center flex-column mt-5">
                {dataToEdit === null ?
                    <div>Loading...</div>
                    :
                    <PhotoForm
                        initialData={dataToEdit}
                        onSubmit={updatePhoto}
                    />
                }
                <Link to="../" relative="path" className="btn btn-secondary">Annulla</Link>
            </section>
        </>
    );
}

export default EditPhoto;