import { Link } from "react-router-dom";
import axios from "../utils/axiosClient.js";
import { useEffect, useRef, useState } from "react";
import { MdFiberNew as AddCategory } from "react-icons/md";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import TableCategories from "../components/TableCategories/TableCategories.jsx";
import DeleteModal from "../components/Modal/Modal.jsx";

const Categories = () => {

    // useState delle categorie
    const [categories, setCategories] = useState([]);

    // Fetch delle categorie
    const fetchCategories = async () => {
        const res = await axios.get('/categories');
        const newCategories = res.data;
        setCategories(newCategories);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    // useState dell'eliminazione della categoria
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Chiamata per l'eliminazione
    const deleteCategory = async () => {
        if (categoryToDelete) {
            await axios.delete(`/categories/${categoryToDelete.id}`);
            setCategories(categories.filter(category => category.id !== categoryToDelete.id));
            setDeleteMode(false);
        }
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

    return (
        <section id="categories" className="container my-5">

            {/* Modale eliminazione */}
            <DeleteModal
                dialogRef={dialogRef}
                title={categoryToDelete?.name}
                setDeleteMode={setDeleteMode}
                deleteBtn={deleteCategory}
            />

            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="m-0 text-white">Categorie</h1>

                {/* Aggiungi categoria */}
                <Link to="create" className="btn btn-primary d-flex align-items-center gap-1">
                    <AddCategory className="fs-5" /> Categoria
                </Link>

            </div>

            <div className="d-flex justify-content-center">

                {/* Table categorie */}
                <TableCategories
                    categories={categories}
                    setCategoryToDelete={setCategoryToDelete}
                    setDeleteMode={setDeleteMode}
                />

            </div>
        </section >
    );
}

export default Categories;