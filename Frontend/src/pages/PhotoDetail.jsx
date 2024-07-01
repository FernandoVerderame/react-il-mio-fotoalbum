import axios from "../utils/axiosClient.js";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhotoCard from "../components/PhotoCard/PhotoCard.jsx";
import { useAuth } from '../contexts/AuthContext';
import { MdDelete as DeleteBtn } from "react-icons/md";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { TbArrowBackUp as BackIcon } from "react-icons/tb";
import { FaEdit as EditIcon } from "react-icons/fa";

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
            <div className="row">
                <div className="col-4">
                    <PhotoCard
                        title={photo?.title}
                        image={photo?.image}
                        user={photo?.user}
                    />
                </div>

                <div className="col-8">
                    <div className="photo-info card">
                        <div className="card-header">
                            <div className="card-title text-center m-0">
                                <h1 className="h3 m-0">{photo?.title}</h1>
                            </div>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-8">
                                    {/* DeleteBtn */}
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

                                    <div className="photo-desc">
                                        <h5>Descrizione</h5>
                                        <p>{photo?.description}</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="photo-cat">
                                        {photo?.categories?.length > 0 ? (
                                            <div>
                                                <h5>Categorie</h5>
                                                <ul className="m-0 p-0 d-flex gap-2" style={{ listStyle: 'none' }}>
                                                    {photo?.categories.map((category, i) => (
                                                        <li key={`category-${i}`} style={{ backgroundColor: category.color }} className="badge">
                                                            {category.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p>Nessuna categoria</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                            <div className="buttons d-flex justify-content-between">
                                <div className="left-btn">
                                    <button
                                        onClick={() => { navigate('/photos') }}
                                        className="btn btn-secondary btn-sm d-flex align-items-center gap-1">
                                        <BackIcon
                                            className="fs-5"
                                        />
                                        <span>Indietro</span>
                                    </button>
                                </div>
                                {isLoggedIn &&
                                    <div className="right-btns d-flex gap-2">
                                        <button
                                            onClick={() => { navigate(`/photos/${slug}/edit`) }}
                                            className="btn btn-warning btn-sm d-flex align-items-center gap-1">
                                            <EditIcon />
                                            <span>Modifica</span>
                                        </button>
                                        <button
                                            onClick={() => setDeleteMode(true)}
                                            className="btn btn-danger btn-sm d-flex align-items-center gap-1">
                                            <DeleteBtn
                                                className="fs-5"
                                            />
                                            <span>Elimina</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default PhotoDetail;
