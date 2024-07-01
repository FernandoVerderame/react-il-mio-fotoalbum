import { AiOutlineClose as CloseIcon } from "react-icons/ai";

const DeleteModal = ({ dialogRef, setDeleteMode, deletePhoto, title }) => {
    return (
        <dialog ref={dialogRef}>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Sei sicuro?</h3>
                <CloseIcon onClick={() => setDeleteMode(false)} role='button' />
            </div>
            <p>Se procedi, eliminerai definitivamente la foto con titolo: "{title}".</p>
            <button
                onClick={deletePhoto}
                className="btn btn-danger btn-sm"
            >
                Elimina
            </button>
        </dialog>
    );
}

export default DeleteModal;