import axios from "../utils/axiosClient.js";
import FormCategory from "../components/FormCategory/FormCategory.jsx";
import { Link, useNavigate } from "react-router-dom";

const CreateCategory = () => {

    const navigate = useNavigate();

    const createCategory = async formData => {
        const res = await axios.post('/categories', formData);

        if (res.status < 400) {
            navigate('/categories');
        }
    }

    return (
        <section id="create-category" className="d-flex align-items-center flex-column">
            <FormCategory
                onSubmit={createCategory}
            />
            <Link to="../" relative="path" className="btn btn-secondary mt-4">Torna indietro</Link>
        </section>
    );
}

export default CreateCategory;