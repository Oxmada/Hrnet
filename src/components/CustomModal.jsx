import ReactModal from "react-modal";

ReactModal.setAppElement("#root"); // important pour l’accessibilité / A supp si pas de bug

export default function CustomModal({ isOpen, onClose, children }) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            overlayClassName="modal-overlay"
            className="modal-content"
        >
            <button
                onClick={onClose}
                className="modal-close"
                aria-label="Close"
            >
                ✕
            </button>

            <p className="modal-message">{children}</p>
        </ReactModal>
    );
}
