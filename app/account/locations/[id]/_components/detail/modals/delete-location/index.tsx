import Modal from "@/components/modal";

interface modalProps {
    closeModal: () => void
    loading: boolean
    onConfirmDeleteLocation: () => void
}

const DeleteLocationModal = ({closeModal, onConfirmDeleteLocation, loading}: modalProps) => (
    <Modal.Container closeModal={closeModal}>
        <Modal.Title>
            Cancellare la location
        </Modal.Title>
        <Modal.Content>
            <p>Questa operazione puó essere eseguita solamente se non esistono prenotazioni effettuate.</p>
        </Modal.Content>
        <Modal.Actions>
            <button
                className="button--primary"
                onClick={onConfirmDeleteLocation}
                disabled={loading}
            >
                Conferma
            </button>
        </Modal.Actions>
    </Modal.Container>
);

export default DeleteLocationModal;
