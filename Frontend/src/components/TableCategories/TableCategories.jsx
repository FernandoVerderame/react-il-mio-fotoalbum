import { MdDelete as DeleteBtn } from "react-icons/md";

const TableCategories = ({ categories, setCategoryToDelete, setDeleteMode }) => {

    const handleDeleteClick = (category) => {
        setCategoryToDelete(category);
        setDeleteMode(true);
    }

    return (
        <table className="table table-hover table-dark w-50">

            {/* Table Head */}
            <thead>
                <tr>
                    <th scope="col" className="bg-secondary">#</th>
                    <th scope="col" className="bg-secondary">Nome</th>
                    <th scope="col" className="bg-secondary">Colore</th>
                    <th scope="col" className="bg-secondary"></th>
                </tr>
            </thead>

            {/* Table body */}
            <tbody>
                {categories.length === 0 ? (
                    <tr>

                        {/* Nel caso in cui non ci fossero categorie */}
                        <td colSpan="3" className="text-center text-white h3">Nessuna categoria trovata!</td>
                    </tr>
                ) : (
                    categories.map((category, i) => (

                        // Record della categoria
                        <tr key={category.id}>

                            {/* Indice */}
                            <th scope="row">{i + 1}</th>

                            {/* Nome categoria */}
                            <td>{category.name}</td>

                            {/* Colore categoria */}
                            <td><div className="badge-cat" style={{ backgroundColor: category.color }}></div></td>
                            <td className="d-flex justify-content-end">

                                {/* Bottone eliminazione */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClick(category);
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
    );
}

export default TableCategories;