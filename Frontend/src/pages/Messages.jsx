import axios from "../utils/axiosClient.js";
import { useEffect, useRef, useState } from "react";
import { MdDelete as DeleteBtn } from "react-icons/md";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";

const Messages = () => {

    // Fetch dei messaggi
    const [messages, setMessages] = useState([]);
    const [expandedMessages, setExpandedMessages] = useState([]);

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

    const toggleAccordion = (id) => {
        if (expandedMessages.includes(id)) {
            setExpandedMessages(expandedMessages.filter(msgId => msgId !== id));
        } else {
            setExpandedMessages([...expandedMessages, id]);
        }
    };

    const handleTransitionEnd = (event) => {
        event.target.style.height = '';
    };

    return (
        <section id="messages" className="container my-5">
            <div className="mb-5">
                <h1 className="m-0 text-white">Dashboard Messaggi</h1>
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

                <div className="accordion w-100" id="accordionMessages">
                    {messages.length === 0 ? (
                        <div className="text-center text-white h3">Nessun messaggio ricevuto!</div>
                    ) : (
                        messages.map(({ id, email, content, user }, i) => (
                            <div className="accordion-item" key={id}>
                                <h2 className="accordion-header" id={`heading${id}`}>
                                    <button
                                        className={`accordion-button ${expandedMessages.includes(id) ? '' : 'collapsed'}`}
                                        type="button"
                                        onClick={() => toggleAccordion(id)}
                                        aria-expanded={expandedMessages.includes(id)}
                                        aria-controls={`collapse${id}`}
                                    >
                                        <div className="d-flex w-100 justify-content-between">
                                            <span><strong>#{i + 1}</strong></span>
                                            <span>Email: <strong>{email}</strong></span>
                                            <span>User Name: <strong>{user.name}</strong></span>
                                            <span className="me-3">User Email: <strong>{user.email}</strong></span>
                                        </div>
                                    </button>
                                </h2>
                                <div

                                    className={`accordion-collapse collapse ${expandedMessages.includes(id) ? 'show' : ''}`}
                                    aria-labelledby={`heading${id}`}
                                    data-bs-parent="#accordionMessages"
                                    style={{ height: expandedMessages.includes(id) ? 'auto' : '0' }}
                                    onTransitionEnd={handleTransitionEnd}
                                >
                                    <div className="accordion-body d-flex justify-content-between align-items-center gap-5">
                                        <p>{content}</p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setMessageToDelete(id);
                                                setDeleteMode(true);
                                            }}
                                            className="btn btn-sm btn-danger"
                                        >
                                            <DeleteBtn className="fs-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section >
    );
}

export default Messages;