import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhotoCard from "../components/PhotoCard/PhotoCard.jsx";

const PhotoDeatil = () => {

    const navigate = useNavigate();

    const { slug } = useParams();
    const [photo, setPhoto] = useState(null);

    const fetchPhoto = async () => {
        try {
            const res = await axios.get(`/photos/${slug}`);
            const newPhoto = res.data;
            setPhoto(newPhoto);
        } catch (error) {
            console.error("Errore nel recupero della foto:", error);
        }
    };

    useEffect(() => {
        fetchPhoto();
        return () => {
            setPhoto(null);
        };
    }, [slug]);

    return (
        <section className="container my-4">
            <PhotoCard
                title={photo?.title}
                slug={photo?.slug}
                image={photo?.image}
                description={photo?.description}
                categories={photo?.categories}
                user={photo?.user}
                isShow={true}
            />
            <button
                onClick={() => { navigate('/photos') }}
                className="btn btn-secondary mt-4"
            >
                Torna indietro
            </button>
        </section>
    );
}

export default PhotoDeatil;
