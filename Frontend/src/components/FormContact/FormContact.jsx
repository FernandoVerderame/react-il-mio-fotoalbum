import { useState } from "react";
import { MdMessage as MessageIcon } from "react-icons/md";

const FormContact = ({ initialData, onSubmit }) => {

    const defaultMessageData = initialData || {
        email: '',
        content: '',
        userId: 1
    };

    const [messageData, setMessageData] = useState(defaultMessageData);

    const [messageError, setMessageError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(messageData);
            setMessageData(defaultMessageData);
        } catch (err) {
            const { errors } = err.response.data;
            const error = new Error(errors ? 'Errore di Invio' : err.response.data);
            error.errors = errors;
            setMessageError(error);
        }
    }

    const changeMessageData = (key, newValue) => {
        setMessageData(data => ({
            ...data,
            [key]: newValue
        }));
    }

    return (
        <>
            <section id="form-contact" className="d-flex justify-content-center align-items-center py-5">
                <div className="card w-50">
                    <div className="card-header">
                        <div className="card-title text-center">
                            <h1 className="h2 m-0 d-flex align-items-center justify-content-center gap-2"><MessageIcon /><span>Messaggi</span></h1>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label h5">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={messageData.email}
                                    onChange={e => changeMessageData('email', e.target.value)}
                                    className="form-control"
                                />
                            </div>

                            {/* Input Content */}
                            <div className="mb-3">
                                <label htmlFor="content" className="h5">Contenuto</label>
                                <textarea
                                    id='content'
                                    name='content'
                                    rows='5'
                                    value={messageData.content}
                                    onChange={e => changeMessageData('content', e.target.value)}
                                    className="form-control"
                                />
                            </div>

                            {messageError !== null && <div className="text-danger">{messageError.message}</div>}
                            {messageError?.errors && messageError.errors.map((err, index) => (
                                <div key={`err${index}`}>{err.msg}</div>
                            ))}

                            <div className="d-flex align-items-center flex-column gap-2">
                                <button className="btn btn-primary">Invia</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FormContact;