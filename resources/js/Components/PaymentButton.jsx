import { router } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect } from "react";

const PaymentButton = ({ amount, name, email, id }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute(
            "data-client-key",
            import.meta.env.VITE_MIDTRANS_CLIENT_KEY
        );
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePay = async () => {
        const res = await axios.post("/payment", {
            amount: amount,
            name: name,
            email: email,
            id: id,
        });

        const snapToken = res.data.snapToken;

        window.snap.pay(snapToken, {
            onSuccess: (result) => console.log("success", result),
            onPending: (result) => console.log("pending", result),
            onError: (result) => console.log("error", result),
        });
    };

    return (
        <button
            onClick={handlePay}
            className="bg-blue-500 p-2 hover:bg-blue-600  text-white rounded-md text-xs uppercase"
        >
            Bayar Sekarang
        </button>
    );
};

export default PaymentButton;
