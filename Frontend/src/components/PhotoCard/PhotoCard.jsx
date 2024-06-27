import photoCardStyle from './PhotoCard.module.scss';
import { MdDelete as DeleteBtn } from "react-icons/md";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const PhotoCard = ({ title, slug, image, description, categories, user, isShow, onDelete }) => {

    const [deleteMode, setDeleteMode] = useState(false);

    const dialogRef = useRef();

    useEffect(() => {
        if (deleteMode) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [deleteMode]);

    const deletePhoto = async () => {
        await onDelete(slug);
        setDeleteMode(false);
    }

    const { isLoggedIn } = useAuth();

    return (
        <section id="photo-card">

            <div className={photoCardStyle.photoCard}>

                {/* DeleteBtn */}
                <dialog ref={dialogRef}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Sei sicuro?</h3>
                        <CloseIcon onClick={() => setDeleteMode(false)} role='button' />
                    </div>
                    <p>Se procedi, eliminerai definitivamente la foto con titolo: "{title}".</p>
                    <button onClick={deletePhoto} className="btn btn-danger">Elimina Foto</button>
                </dialog>

                <div className={photoCardStyle.thumb}>
                    <div className={photoCardStyle.image}>
                        <img src={image ? `http://${image}` : "https://placehold.co/600x400"} alt={title} className={photoCardStyle.img} />
                    </div>
                </div>

                <div className={photoCardStyle.bottom}>
                    <div className="photo-title">
                        <h3 className="h5">{title}</h3>
                    </div>
                    <div className="photo-author">
                        <p className="fst-italic">{user?.name}</p>
                    </div>
                </div>
            </div>

            {isShow &&
                <div className="photo-info">

                    <div className="photo-desc">
                        <p className={photoCardStyle.paragraph}>{description}</p>
                    </div>

                    <div className="photo-cat">
                        {categories?.length > 0 ? (
                            <div>
                                <ul className="m-0 p-0 d-flex gap-2" style={{ listStyle: 'none' }}>
                                    {categories.map((category, i) => (
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

                    <div className="buttons">
                        {isLoggedIn &&
                            <>
                                <Link to={`/photos/${slug}/edit`} className="btn btn-warning mt-4">
                                    Modifica
                                </Link>
                                <DeleteBtn onClick={() => setDeleteMode(true)} className="fs-4" />
                            </>
                        }
                    </div>
                </div>
            }

        </section>

    );
}

export default PhotoCard;
