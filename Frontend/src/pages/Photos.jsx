import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdFiberNew as AddPhoto } from "react-icons/md";
import PhotoCard from "../components/PhotoCard/PhotoCard.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Alert from "../components/Alert/Alert.jsx";

const Photos = () => {

    // Recupero useNavigate da react router dom
    const location = useLocation();

    // Recupero useNavigate da react router dom
    const navigate = useNavigate();

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

    // Fetch delle foto
    const fetchPhotos = async (title = '') => {
        const res = await axios.get(`/photos`, { params: { title } });
        const newPhotos = res.data.data;
        setPhotos(newPhotos);
    }

    useEffect(() => {
        fetchPhotos();
    }, []);

    // onChange in tempo reale tramite la search-bar
    const handleSearch = (e) => {
        setSearchTitle(e.target.value);
        fetchPhotos(e.target.value);
    }

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

                {/* SearchBar */}
                <SearchBar
                    value={searchTitle}
                    onChange={handleSearch}
                />

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