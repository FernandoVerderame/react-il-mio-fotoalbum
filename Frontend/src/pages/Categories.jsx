import { Link } from "react-router-dom";
import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { MdFiberNew as AddCategory } from "react-icons/md";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const res = await axios.get('/categories');
        const newCategories = res.data;
        setCategories(newCategories);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <section id="categories" className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="m-0 text-white">Categorie</h1>
                <Link to="create" className="btn btn-primary d-flex align-items-center gap-1"><AddCategory className="fs-5" /> Categoria</Link>
            </div>

            <div className="d-flex justify-content-center">
                <table className="table table-hover table-dark w-75">
                    <thead>
                        <tr>
                            <th scope="col" className="bg-secondary">#</th>
                            <th scope="col" className="bg-secondary">Nome</th>
                            <th scope="col" className="bg-secondary">Colore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center text-white h3">Nessuna categoria trovata!</td>
                            </tr>
                        ) : (
                            categories.map(({ id, name, color }, i) => (
                                <tr key={id}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{name}</td>
                                    <td><div className="badge-cat" style={{ backgroundColor: color }}></div></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section >
    );
}

export default Categories;