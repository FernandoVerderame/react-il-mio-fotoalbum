import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PhotoCard from "../components/PhotoCard/PhotoCard.jsx";

const Photos = () => {

    const [photos, setPhotos] = useState(null);

    const fetchPhotos = async () => {
        const res = await axios.get(`/photos`);
        const newPhotos = res.data.data;
        setPhotos(newPhotos);
    }

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <section className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="m-0">Album</h1>
            </div>
            <div className="row g-5">
                {photos?.map(({ id, title, slug, image, description, categories, visible, user }) => (
                    visible === true &&
                    <div key={id} className="col-4">
                        <Link to={`/photos/${slug}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <PhotoCard
                                title={title}
                                image={image}
                                description={description}
                                categories={categories}
                                user={user}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Photos;