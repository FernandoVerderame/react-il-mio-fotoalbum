import { MdDelete as DeleteBtn } from "react-icons/md";

const AccordionMessages = ({ messages, expandedMessages, toggleAccordion, handleTransitionEnd, setMessageToDelete, setDeleteMode }) => {
    return (
        <div className="accordion w-100" id="accordionMessages">
            {messages.length === 0 ? (

                // Nel caso in cui non ci siano dei messaggi
                <div className="text-center text-white h3">Nessun messaggio ricevuto!</div>

            ) : (
                messages.map(({ id, email, content, user }, i) => (

                    // Record del messaggio
                    <div className="accordion-item" key={id}>
                        <h2 className="accordion-header" id={`heading${id}`}>

                            {/* Bottone per l'espansione del body */}
                            <button
                                className={`accordion-button ${expandedMessages.includes(id) ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => toggleAccordion(id)}
                                aria-expanded={expandedMessages.includes(id)}
                                aria-controls={`collapse${id}`}
                            >
                                <div className="d-flex w-100 justify-content-between">

                                    {/* Indice */}
                                    <span><strong>#{i + 1}</strong></span>

                                    {/* Email del mittente */}
                                    <span>Email: <strong>{email}</strong></span>

                                    {/* User Nome del destinatario */}
                                    <span>User Name: <strong>{user.name}</strong></span>

                                    {/* User Email del destinatario */}
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

                                {/* Contenuto del messaggio */}
                                <p>{content}</p>

                                {/* Bottone cancellazione */}
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
    );
}

export default AccordionMessages;
