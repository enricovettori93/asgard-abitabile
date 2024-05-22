import Modal from "@/components/modal";

interface modalProps {
    closeModal: () => void
    loading: boolean
    onConfirmDeleteImage: () => void
}

const DeleteImageModal = ({closeModal, onConfirmDeleteImage, loading}: modalProps) => (
    <Modal.Container closeModal={closeModal}>
        <Modal.Title>
            Cancellare l'immagine
        </Modal.Title>
        <Modal.Content>
            <p>Cancellare l'immagine selezionata dalla location?</p>
        </Modal.Content>
        <Modal.Actions>
            <button
                className="button--primary"
                onClick={onConfirmDeleteImage}
                disabled={loading}
            >
                Conferma
            </button>
        </Modal.Actions>
    </Modal.Container>
);

export default DeleteImageModal;
