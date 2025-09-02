import FakultasForm from "@/Components/forms/FakultasForm";
import AdminLayout from "@/Layouts/AdminLayout";

const CreateFakultas = () => {
    return (
        <AdminLayout title={["Fakultas", "Form"]}>
            <div className="bg-white rounded-md p-4">
                <FakultasForm />
            </div>
        </AdminLayout>
    );
};

export default CreateFakultas;
