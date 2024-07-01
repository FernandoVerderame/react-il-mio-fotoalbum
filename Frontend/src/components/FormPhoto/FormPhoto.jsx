// Importo lo style del Form, l'icona, la PostCard e lo useState
import { useState } from 'react';
import { useGlobal } from '../../contexts/GlobalContext';
import formStyle from './FormPhoto.module.scss';
import { FaRegSave as Save } from "react-icons/fa";

const FormPhoto = ({ initialData, onSubmit }) => {

    const { categories } = useGlobal();

    // Photo di default
    const defaultPhotoData = initialData || {
        title: '',
        image: '',
        description: '',
        categories: [],
        visible: false
    }


    // useState del singolo nuovo Post
    const [photoData, setPhotoData] = useState(defaultPhotoData);

    // Campo delle categorie
    const handleField = (name, value) => {

        setPhotoData(curr => ({
            ...curr,
            [name]: value
        }));
    }

    // Submit del Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(photoData);
    }

    // Update della foto
    const changePhotoData = (key, newValue) => {
        setPhotoData(data => ({ ...data, [key]: newValue }));
    }

    return (
        <>
            {/* Form Card */}
            <div className={formStyle.cardForm}>

                {/* Card Title */}
                <div className={formStyle.cardTitle}>
                    <h3>Creazione Photo</h3>
                </div>

                {/* Card Body */}
                <div className={formStyle.cardBody}>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>

                        <div className="row">
                            <div className="col-6">
                                {/* Input Title */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="h5">Titolo</label>
                                    <input
                                        type="text"
                                        id='title'
                                        name='title'
                                        value={photoData.title}
                                        onChange={(e) => changePhotoData('title', e.target.value)}
                                        className="form-control"
                                    />
                                </div>

                                {/* Input Image */}
                                <div className="mb-3">
                                    <label htmlFor="image" className="h5">Immagine del post</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        onChange={(e) => handleField('image', e.target.files[0])}
                                    />
                                </div>

                                {/* Input Content */}
                                <div className={formStyle.cardInput}>
                                    <label htmlFor="description" className="h5">Descrizione</label>
                                    <textarea
                                        id='description'
                                        name='description'
                                        rows='5'
                                        value={photoData.description}
                                        onChange={(e) => changePhotoData('description', e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="col-6">

                                {/* Input Categories */}
                                <div className="mb-5">
                                    <h5 className="h5">Categorie</h5>
                                    <ul>
                                        {categories.map(({ id, name }, i) => (
                                            <li key={`category-${i}`}>
                                                <input
                                                    type='checkbox'
                                                    checked={photoData.categories.includes(id)}
                                                    onChange={() => {
                                                        const curr = photoData.categories;
                                                        const newCategories = curr.includes(id) ?
                                                            curr.filter(el => el !== id) :
                                                            [...curr, id];
                                                        handleField('categories', newCategories);
                                                    }}
                                                    className="form-check-input"
                                                />
                                                <label>{name}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={formStyle.cardBtn}>

                                    {/* Input Visible */}
                                    <div className={formStyle.published}>
                                        <label htmlFor="visible" className="form-check-label">Pubblicato</label>
                                        <input
                                            id='visible'
                                            name='visible'
                                            type='checkbox'
                                            checked={photoData['visible']}
                                            onChange={(e) => handleField('visible', e.target.checked)}
                                            className="form-check-input"
                                        />
                                    </div>
                                    <button className='btn btn-success'><Save /> Salva</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div >
        </>
    );
}

export default FormPhoto;