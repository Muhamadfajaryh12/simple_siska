import TextInputContent from "@/Components/input/TextInputContent";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React from "react";

const ChangePasswordForm = () => {
    const { setData, data, processing, put, errors } = useForm({
        password_lama: "",
        password_baru: "",
    });
    return (
        <form className="flex flex-col gap-4">
            <TextInputContent
                type={"password"}
                label={"Password Sebelumnya"}
                value={data.password_lama}
                onChange={(e) => setData("password_lama", e.target.value)}
                errors={errors.password_lama}
            />
            <TextInputContent
                type={"password"}
                label={"Password Terbaru"}
                value={data.password_baru}
                onChange={(e) => setData("password_baru", e.target.value)}
                errors={errors.password_baru}
            />
            <PrimaryButton disabled={processing}>SIMPAN</PrimaryButton>
        </form>
    );
};

export default ChangePasswordForm;
