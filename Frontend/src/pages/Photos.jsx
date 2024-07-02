import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdFiberNew as AddPhoto } from "react-icons/md";
import PhotoCard from "../components/PhotoCard/PhotoCard.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Alert from "../components/Alert/Alert.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const Photos = () => {

    // Importo l'autenticazione dello User
    const { user } = useAuth();

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

    // useState delle foto
    const [photos, setPhotos] = useState([]);

    // useState per la ricerca delle foto tramite il titolo
    const [searchTitle, setSearchTitle] = useState('');

    // useState per il filtro delle foto del singolo user
    const [userFilter, setUserFilter] = useState('');

    // Fetch delle foto
    const fetchPhotos = async () => {
        const res = await axios.get(`/photos`, { params: { title: searchTitle, user: userFilter } });
        const newPhotos = res.data.data;
        setPhotos(newPhotos);
    }

    useEffect(() => {
        fetchPhotos();
    }, [searchTitle, userFilter]);

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

            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="m-0 text-white">Album</h1>

                <div className="d-flex align-items-center gap-3">
                    {/* SearchBar */}
                    <SearchBar
                        value={searchTitle}
                        onChange={e => setSearchTitle(e.target.value)}
                    />

                    {/* Filtro per le foto dello User */}
                    {user &&
                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                role="switch"
                                id="userFilter"
                                checked={userFilter}
                                onChange={e => setUserFilter(e.target.checked)}
                                className="form-check-input"
                            />
                            <label className="form-check-label text-white" htmlFor="userFilter">User Foto</label>
                        </div>
                    }
                </div>

                {/* Aggiungi foto */}
                <Link to="create" className="btn btn-primary d-flex align-items-center gap-1"><AddPhoto className="fs-5" /> Foto</Link>
            </div>
            <div className="row g-5">
                {photos.length === 0 ? (
                    <div className="col-12">

                        {/* Nel caso non ci siano foto */}
                        <p className="text-center text-white h3">Nessuna foto trovata!</p>

                    </div>
                ) : (
                    photos.map(({ id, title, slug, image, description, categories, visible, user }) => (
                        visible === true &&
                        <div key={id} className="col-4">

                            {/* Tasto show della singola foto */}
                            <Link to={`/photos/${slug}`} style={{ textDecoration: 'none', color: 'black' }}>

                                {/* Card della foto */}
                                <PhotoCard
                                    title={title}
                                    slug={slug}
                                    image={image}
                                    description={description}
                                    categories={categories}
                                    user={user}
                                />

                            </Link>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default Photos;