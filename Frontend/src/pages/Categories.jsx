import { Link } from "react-router-dom";
import axios from "../utils/axiosClient.js";
import { useEffect, useRef, useState } from "react";
import { MdFiberNew as AddCategory } from "react-icons/md";
import { MdDelete as DeleteBtn } from "react-icons/md";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";

const Categories = () => {

    // Fetch delle categorie
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const res = await axios.get('/categories');
        const newCategories = res.data;
        setCategories(newCategories);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    // Eliminazione delle categorie
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const deleteCategory = async () => {
        if (categoryToDelete) {
            await axios.delete(`/categories/${categoryToDelete}`);
            setCategories(categories.filter(category => category.id !== categoryToDelete));
            setDeleteMode(false);
        }
    }

    // Modale eliminazione
    const [deleteMode, setDeleteMode] = useState(false);

    const dialogRef = useRef();

    useEffect(() => {
        if (deleteMode) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [deleteMode]);

    return (
        <section id="categories" className="container my-5">

            {/* DeleteBtn */}
            <dialog ref={dialogRef}>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Sei sicuro?</h3>
                    <CloseIcon onClick={() => setDeleteMode(false)} role='button' />
                </div>
                <p>Se procedi, eliminerai definitivamente la categoria.</p>
                <button
                    onClick={deleteCategory}
                    className="btn btn-danger btn-sm"
                >
                    Elimina
                </button>
            </dialog>

            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="m-0 text-white">Categorie</h1>
                <Link to="create" className="btn btn-primary d-flex align-items-center gap-1"><AddCategory className="fs-5" /> Categoria</Link>
            </div>

            <div className="d-flex justify-content-center">
                <table className="table table-hover table-dark w-50">
                    <thead>
                        <tr>
                            <th scope="col" className="bg-secondary">#</th>
                            <th scope="col" className="bg-secondary">Nome</th>
                            <th scope="col" className="bg-secondary">Colore</th>
                            <th scope="col" className="bg-secondary"></th>
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
                                    <td className="d-flex justify-content-end">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCategoryToDelete(id);
                                                setDeleteMode(true);
                                            }}
                                            className="btn btn-sm btn-danger"
                                        >
                                            <DeleteBtn className="fs-5" />
                                        </button>
                                    </td>
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