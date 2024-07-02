import axios from "../utils/axiosClient.js";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PhotoCard from "../components/PhotoCard/PhotoCard.jsx";
import { useAuth } from '../contexts/AuthContext';
import PhotoInfo from "../components/PhotoInfo/PhotoInfo.jsx";
import DeleteModal from "../components/Modal/Modal.jsx";
import Alert from "../components/Alert/Alert.jsx";

const PhotoDetail = () => {

    // Recupero useNavigate da react router dom
    const location = useLocation();

    // Recupero useNavigate da react router dom
    const navigate = useNavigate();

    // useState Alert
    const [alert, setAlert] = useState(location.state?.alert || null);

    useEffect(() => {
        if (alert) {
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [alert, navigate, location.pathname]);

    // Recupero lo slug dai parametri
    const { slug } = useParams();

    // useState della singola foto
    const [photo, setPhoto] = useState(null);

    // Fecth della singola foto
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

    // Funzione per la cancellazione
    const deletePhoto = async () => {
        await axios.delete(`/photos/${slug}`);
        navigate('/photos', {
            state: { alert: { type: 'error', message: 'Foto eliminata con successo!' } }
        });
    }

    // Modale
    const [deleteMode, setDeleteMode] = useState(false);

    const dialogRef = useRef();

    useEffect(() => {
        if (deleteMode) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [deleteMode]);

    // Autenticazione
    const { isLoggedIn } = useAuth();

    return (
        <section className="container my-5">

            {/* Mostra l'alert se esiste */}
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            {/* Modale eliminazione */}
            <DeleteModal
                dialogRef={dialogRef}
                title={photo?.title}
                setDeleteMode={setDeleteMode}
                deleteBtn={deletePhoto}
            />

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
