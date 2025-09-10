import SelectContent from "@/Components/input/SelectContent";
import TextInputContent from "@/Components/input/TextInputContent";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState } from "react";
import ProfileForm from "./Partials/ProfileForm";
import ProfileKuliah from "./Partials/ProfileKuliah";
import ChangePasswordForm from "./Partials/ChangePasswordForm";

const Profile = ({ data_mahasiswa }) => {
    const [active, setActive] = useState("data_diri");
    const buttonActive = (value) => {
        return active == value
            ? `bg-green-600 text-white font-semibold`
            : `bg-white`;
    };

    const handleSection = () => {
        switch (active) {
            case "data_diri":
                return <ProfileForm data_mahasiswa={data_mahasiswa} />;
            case "data_kuliah":
                return <ProfileKuliah data_mahasiswa={data_mahasiswa} />;
            case "ubah_password":
                return <ChangePasswordForm />;
            default:
                break;
        }
    };
    return (
        <AdminLayout title={["Profile", `${data_mahasiswa.nama_mahasiswa}`]}>
            <div className="flex mb-4 gap-2">
                <button
                    onClick={() => setActive("data_diri")}
                    className={`${buttonActive(
                        "data_diri"
                    )} rounded-md p-2  w-full`}
                >
                    Informasi Diri
                </button>
                <button
                    onClick={() => setActive("data_kuliah")}
                    className={`${buttonActive(
                        "data_kuliah"
                    )} rounded-md p-2  w-full`}
                >
                    Informasi Kuliah
                </button>
                <button
                    onClick={() => setActive("ubah_password")}
                    className={`${buttonActive(
                        "ubah_password"
                    )} rounded-md p-2  w-full`}
                >
                    Ubah Password
                </button>
            </div>
            <div className="bg-white rounded-md border p-4">
                {handleSection()}
            </div>
        </AdminLayout>
    );
};

export default Profile;
