import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdFiberNew as AddPhoto } from "react-icons/md";
import { FaSearch as SearchIcon } from "react-icons/fa";
import PhotoCard from "../components/PhotoCard/PhotoCard.jsx";

const Photos = () => {

    const [photos, setPhotos] = useState([]);

    const [searchTitle, setSearchTitle] = useState('');

    const fetchPhotos = async (title = '') => {
        const res = await axios.get(`/photos`, { params: { title } });
        const newPhotos = res.data.data;
        setPhotos(newPhotos);
    }

    useEffect(() => {
        fetchPhotos();
    }, []);

    const handleSearch = (e) => {
        setSearchTitle(e.target.value);
        fetchPhotos(e.target.value);
    }

    return (
        <section className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="m-0">Album</h1>
                <div className="input-group search-bar">
                    <span className="input-group-text">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={searchTitle}
                        onChange={handleSearch}
                    />
                </div>
                <Link to="create" className="btn btn-primary d-flex align-items-center gap-1"><AddPhoto className="fs-5" /> Foto</Link>
            </div>
            <div className="row g-5">
                {photos.length === 0 ? (
                    <div className="col-12">
                        <p className="text-center h3">Nessuna foto trovata!</p>
                    </div>
                ) : (
                    photos.map(({ id, title, slug, image, description, categories, visible, user }) => (
                        visible === true &&
                        <div key={id} className="col-4">
                            <Link to={`/photos/${slug}`} style={{ textDecoration: 'none', color: 'black' }}>
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