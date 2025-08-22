import TextInputContent from "@/Components/input/TextInputContent";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React from "react";

const ChangePasswordForm = () => {
    const { setData, data, processing, put, errors, reset } = useForm({
        password_old: "",
        password_new: "",
    });

    const handleSubmitChangePassword = (e) => {
        e.preventDefault();

        put(route("change_password"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmitChangePassword}
        >
            <TextInputContent
                type={"password"}
                label={"Password Sebelumnya"}
                value={data.password_old}
                onChange={(e) => setData("password_old", e.target.value)}
                errors={errors.password_old}
            />
            <TextInputContent
                type={"password"}
                label={"Password Terbaru"}
                value={data.password_new}
                onChange={(e) => setData("password_new", e.target.value)}
                errors={errors.password_new}
            />
            <PrimaryButton disabled={processing}>SIMPAN</PrimaryButton>
        </form>
    );
};

export default ChangePasswordForm;
