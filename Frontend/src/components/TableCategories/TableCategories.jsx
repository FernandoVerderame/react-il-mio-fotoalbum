import { MdDelete as DeleteBtn } from "react-icons/md";

const TableCategories = ({ categories, setCategoryToDelete, setDeleteMode }) => {
    return (
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
    );
}

export default TableCategories;