import FakultasForm from "@/Components/forms/FakultasForm";
import AdminLayout from "@/Layouts/AdminLayout";

const CreateFakultas = () => {
    return (
        <AdminLayout title={["Fakultas", "Form"]}>
            <div className=" text-gray-900">
                <p className="text-lg">Formulir Pembuatan Fakultas</p>
                <span className="text-sm font-bold">
                    Silahkan mengisi formulir dengan benar!
                </span>
            </div>
            <FakultasForm />
        </AdminLayout>
    );
};

export default CreateFakultas;
