import axios from "../utils/axiosClient.js";
import PhotoForm from "../components/FormPhoto/FormPhoto.jsx";
import { Link, useNavigate } from "react-router-dom";

const CreatePhoto = () => {

    const navigate = useNavigate();

    const createPhoto = async formData => {
        const res = await axios.post(`/photos`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (res.status < 400) {
            navigate(`/photos/${res.data.slug}`);
        }
    }

    return (
        <section id="create-photo-form" className="d-flex align-items-center flex-column">
            <PhotoForm
                onSubmit={createPhoto}
            />
            <Link to="../" relative="path" className="btn btn-secondary">Torna indietro</Link>
        </section>
    );
}

export default CreatePhoto;