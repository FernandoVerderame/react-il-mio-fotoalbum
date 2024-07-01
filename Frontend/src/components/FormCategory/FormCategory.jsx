import { useState } from "react";
import { FaRegSave as Save } from "react-icons/fa";

const FormCategory = ({ initialData, onSubmit }) => {

    // Categoria di default
    const defaultCategoryData = initialData || {
        name: '',
        color: ''
    }

    // useState della singola nuova categoria
    const [categoryData, setCategoryData] = useState(defaultCategoryData);

    // Submit del Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(categoryData);
    }

    // Update della categoria
    const changeCategoryData = (key, newValue) => {
        setCategoryData(data => ({ ...data, [key]: newValue }));
    }

    return (
        <section id="create-category-form" className="d-flex justify-content-center align-items-center">
            <div className="card w-100">
                <div className="card-header">
                    <div className="card-title text-center">
                        <h1 className="h2 m-0 d-flex align-items-center justify-content-center"><span>Creazione Categoria</span></h1>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        {/* Input Nome */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label h5">Nome</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nome categoria"
                                value={categoryData.name}
                                onChange={e => changeCategoryData('name', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        {/* Input Nome */}
                        <div className="mb-3">
                            <label htmlFor="color" className="form-label h5">Colore</label>
                            <input
                                id="color"
                                name="color"
                                type="color"
                                placeholder="Colore categoria"
                                value={categoryData.color}
                                onChange={e => changeCategoryData('color', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="d-flex align-items-center flex-column gap-2">
                            <button className="btn btn-success mt-2"><Save /> Salva</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default FormCategory;