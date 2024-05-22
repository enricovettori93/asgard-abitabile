import Modal from "@/components/modal";
import ReservationDetail from "@/app/account/locations/[id]/_components/detail/reservation-detail";
import {ReservationWithUser} from "@/types/reservation";

interface modalProps {
    reservation: ReservationWithUser
    closeModal: () => void
    loading: boolean
    onConfirmDeleteReservation: () => void
}

const DetailReservationModal = ({reservation, closeModal, onConfirmDeleteReservation, loading}: modalProps) => (
    <Modal.Container closeModal={closeModal}>
        <Modal.Title>
            Dettagli prenotazione
        </Modal.Title>
        <Modal.Content>
            <ReservationDetail reservation={reservation}/>
        </Modal.Content>
        <Modal.Actions>
            {
                !reservation.confirmed && (
                    <button
                        className="button--primary"
                        onClick={onConfirmDeleteReservation}
                        disabled={loading}
                    >
                        Conferma prenotazione
                    </button>
                )
            }
        </Modal.Actions>
    </Modal.Container>
);

export default DetailReservationModal;
