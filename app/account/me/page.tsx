import EditAccountDetailForm from "@/app/account/me/_components/edit-account-detail-form";
import EditAccountPasswordForm from "@/app/account/me/_components/edit-account-password-form";
import Card from "@/components/card";
import Accordion from "@/components/accordion";

const MyAccountDetail = () => {
    return (
        <div>
            <h3 className="text-2xl mb-10">In questa sezione puoi modificare le informazioni del tuo account</h3>
            <Card>
                <Accordion title="I tuoi dati" isOpen={true}>
                    <EditAccountDetailForm />
                </Accordion>
            </Card>
            <Card className="mt-8 md:mt-8">
                <Accordion title="Gestione password">
                    <EditAccountPasswordForm />
                </Accordion>
            </Card>
        </div>
    )
}

export default MyAccountDetail
