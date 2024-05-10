import EditAccountDetailForm from "@/app/account/me/_components/edit-account-detail-form";
import EditAccountPasswordForm from "@/app/account/me/_components/edit-account-password-form";

const MyAccountDetail = () => {
    return (
        <div>
            <h3 className="mb-10">Modifica le informazioni del tuo account</h3>
            <EditAccountDetailForm />
            <EditAccountPasswordForm />
        </div>
    )
}

export default MyAccountDetail
