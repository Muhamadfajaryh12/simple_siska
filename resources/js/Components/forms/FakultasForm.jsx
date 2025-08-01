import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect } from "react";
import TextInputContent from "../input/TextInputContent";
import PrimaryButton from "../PrimaryButton";
import { useForm } from "@inertiajs/react";

const FakultasForm = ({ fakultas }) => {
    const { data, setData, errors, reset, post, put, processing } = useForm({
        nama_fakultas: "",
        kode_fakultas: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fakultas
            ? put(route(`fakultas.edit`, { id: fakultas.id }))
            : post(route("fakultas.store"), {
                  onSuccess: () => {
                      reset();
                  },
              });
        console.log(fakultas);
    };

    useEffect(() => {
        if (fakultas) {
            setData({
                nama_fakultas: fakultas.nama_fakultas,
                kode_fakultas: fakultas.kode_fakultas,
            });
        }
    }, [fakultas]);

    return (
        <div className="mt-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextInputContent
                    label={"Nama Fakultas"}
                    name={"nama_fakultas"}
                    type={"text"}
                    errors={errors.nama_fakultas}
                    isFocused={true}
                    value={data.nama_fakultas}
                    onChange={(e) =>
                        setData("nama_fakultas", e.target.value.toUpperCase())
                    }
                />
                <TextInputContent
                    label={"Kode Fakultas"}
                    name={"kode_fakultas"}
                    type={"text"}
                    errors={errors.kode_fakultas}
                    value={data.kode_fakultas}
                    onChange={(e) =>
                        setData("kode_fakultas", e.target.value.toUpperCase())
                    }
                />
                <PrimaryButton disabled={processing} className="w-24">
                    Submit
                </PrimaryButton>
            </form>
        </div>
    );
};

export default FakultasForm;
