import axios from "../utils/axiosClient.js";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhotoCard from "../components/PhotoCard/PhotoCard.jsx";
import { useAuth } from '../contexts/AuthContext';
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import PhotoInfo from "../components/PhotoInfo/PhotoInfo.jsx";

const PhotoDetail = () => {

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

    const deletePhoto = async () => {
        await axios.delete(`/photos/${slug}`);
        navigate('/photos');
    }

    const [deleteMode, setDeleteMode] = useState(false);

    const dialogRef = useRef();

    useEffect(() => {
        if (deleteMode) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [deleteMode]);

    const { isLoggedIn } = useAuth();

    return (
        <section className="container my-5">

            {/* Modale eliminazione */}
            <dialog ref={dialogRef}>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Sei sicuro?</h3>
                    <CloseIcon onClick={() => setDeleteMode(false)} role='button' />
                </div>
                <p>Se procedi, eliminerai definitivamente la foto con titolo: "{photo?.title}".</p>
                <button
                    onClick={deletePhoto}
                    className="btn btn-danger btn-sm"
                >
                    Elimina
                </button>
            </dialog>

            <div className="row">
                <div className="col-4">

                    {/* Card della foto */}
                    <PhotoCard
                        title={photo?.title}
                        image={photo?.image}
                        user={photo?.user}
                    />

                </div>

                <div className="col-8">

                    {/* Info card */}
                    <PhotoInfo
                        title={photo?.title}
                        description={photo?.description}
                        categories={photo?.categories}
                        isLoggedIn={isLoggedIn}
                        navigate={navigate}
                        slug={slug}
                        setDeleteMode={setDeleteMode}
                    />

                </div>
            </div>
        </section >
    );
}

export default PhotoDetail;
