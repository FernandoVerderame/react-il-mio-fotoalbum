import { MdDelete as DeleteBtn } from "react-icons/md";

const AccordionMessages = ({ messages, expandedMessages, toggleAccordion, handleTransitionEnd, setMessageToDelete, setDeleteMode }) => {
    return (
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
    );
}

export default AccordionMessages;
