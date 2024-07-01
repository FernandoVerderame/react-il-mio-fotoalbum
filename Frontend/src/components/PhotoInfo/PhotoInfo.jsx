import { MdDelete as DeleteBtn } from "react-icons/md";
import { TbArrowBackUp as BackIcon } from "react-icons/tb";
import { FaEdit as EditIcon } from "react-icons/fa";

const PhotoInfo = ({ title, slug, description, categories, isLoggedIn, navigate, setDeleteMode }) => {
    return (
        <div className="photo-info card">
            <div className="card-header">
                <div className="card-title text-center m-0">

                    {/* Titolo*/}
                    <h1 className="h3 m-0">{title}</h1>

                </div>
            </div>
            <div className="card-body">

                <div className="row">
                    <div className="col-8">
                        <div className="photo-desc">

                            {/* Descrizione */}
                            <h5>Descrizione</h5>
                            <p>{description}</p>

                        </div>
                    </div>
                    <div className="col-4">
                        <div className="photo-cat">

                            {/* Categorie */}
                            {categories?.length > 0 ? (
                                <div>
                                    <h5>Categorie</h5>
                                    <ul className="m-0 p-0 d-flex gap-2" style={{ listStyle: 'none' }}>
                                        {categories.map((category, i) => (
                                            <li key={`category-${i}`} style={{ backgroundColor: category.color }} className="badge">
                                                {category.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                // Nel caso in cui non ci fossero categorie
                                <p>Nessuna categoria</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <div className="card-footer">
                <div className="buttons d-flex justify-content-between">
                    <div className="left-btn">

                        {/* Bottone per tornare indietro */}
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

                            {/* Bottone modifica */}
                            <button
                                onClick={() => { navigate(`/photos/${slug}/edit`) }}
                                className="btn btn-warning btn-sm d-flex align-items-center gap-1">
                                <EditIcon />
                                <span>Modifica</span>
                            </button>

                            {/* Bottone eliminazione */}
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
    );
}

export default PhotoInfo;