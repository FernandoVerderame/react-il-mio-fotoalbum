import axios from "../utils/axiosClient.js";
import { useEffect, useRef, useState } from "react";
import { MdDelete as DeleteBtn } from "react-icons/md";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";

const Messages = () => {

    // Fetch dei messaggi
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        const res = await axios.get('/messages');
        const newMessages = res.data;
        setMessages(newMessages);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    // Cancellazione dei messaggi
    const [messageToDelete, setMessageToDelete] = useState(null);

    const deleteMessage = async () => {
        if (messageToDelete) {
            await axios.delete(`/messages/${messageToDelete}`);
            setMessages(messages.filter(message => message.id !== messageToDelete));
            setDeleteMode(false);
        }
    }

    // Modale cancellazione
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
        <section id="messages" className="container my-5">
            <div className="mb-5">
                <h1 className="m-0 text-white">Messaggi</h1>
            </div>

            <div className="d-flex justify-content-center">

                {/* DeleteBtn */}
                <dialog ref={dialogRef}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Sei sicuro?</h3>
                        <CloseIcon onClick={() => setDeleteMode(false)} role='button' />
                    </div>
                    <p>Se procedi, eliminerai definitivamente il messaggio ricevuto.</p>
                    <button
                        onClick={deleteMessage}
                        className="btn btn-danger btn-sm"
                    >
                        Elimina
                    </button>
                </dialog>

                <table className="table table-hover table-dark w-75">
                    <thead>
                        <tr>
                            <th scope="col" className="bg-secondary">#</th>
                            <th scope="col" className="bg-secondary">Email</th>
                            <th scope="col" className="bg-secondary">Contenuto</th>
                            <th scope="col" className="bg-secondary">User Name</th>
                            <th scope="col" className="bg-secondary">User Email</th>
                            <th scope="col" className="bg-secondary"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center text-white h3">Nessun messaggio ricevuto!</td>
                            </tr>
                        ) : (
                            messages.map(({ id, email, content, user }, i) => (
                                <tr key={id}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{email}</td>
                                    <td>{content}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="d-flex justify-content-end">
                                        <button
                                            onClick={() => {
                                                setMessageToDelete(id);
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

export default Messages;