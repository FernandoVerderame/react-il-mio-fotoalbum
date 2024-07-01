import axios from "../utils/axiosClient.js";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import AccordionMessages from "../components/AccordionMessages/AccordionMessages.jsx";
import DeleteModal from "../components/Modal/Modal.jsx";

const Messages = () => {

    // useState dei messaggi
    const [messages, setMessages] = useState([]);

    // useState del toggle
    const [expandedMessages, setExpandedMessages] = useState([]);

    // Fetch dei messaggi
    const fetchMessages = async () => {
        const res = await axios.get('/messages');
        const newMessages = res.data;
        setMessages(newMessages);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    // useState eliminazione del messaggio
    const [messageToDelete, setMessageToDelete] = useState(null);

    // Chiamata per l'eliminazione del messaggio
    const deleteMessage = async () => {
        if (messageToDelete) {
            await axios.delete(`/messages/${messageToDelete}`);
            setMessages(messages.filter(message => message.id !== messageToDelete));
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

    // Funzione per il toggle dell'accordion
    const toggleAccordion = (id) => {
        if (expandedMessages.includes(id)) {
            setExpandedMessages(expandedMessages.filter(msgId => msgId !== id));
        } else {
            setExpandedMessages([...expandedMessages, id]);
        }
    };

    // Transizione dell'accordion
    const handleTransitionEnd = (event) => {
        event.target.style.height = '';
    };

    return (
        <section id="messages" className="container my-5">

            {/* Modale eliminazione */}
            <DeleteModal
                dialogRef={dialogRef}
                title={messageToDelete}
                setDeleteMode={setDeleteMode}
                deleteBtn={deleteMessage}
            />

            <div className="mb-5">
                <h1 className="m-0 text-white">Dashboard Messaggi</h1>
            </div>

            <div className="d-flex justify-content-center">

                {/* Accordion messaggi */}
                <AccordionMessages
                    messages={messages}
                    expandedMessages={expandedMessages}
                    handleTransitionEnd={handleTransitionEnd}
                    toggleAccordion={toggleAccordion}
                    setMessageToDelete={setMessageToDelete}
                    setDeleteMode={setDeleteMode}
                />

            </div>
        </section >
    );
}

export default Messages;