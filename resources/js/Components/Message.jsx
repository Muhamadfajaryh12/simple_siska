import { usePage } from "@inertiajs/react";
import React from "react";

const Message = () => {
    const { props } = usePage();
    const success = props.flash?.success;
    const error = props.flash?.error;
    return (
        <>
            {success && (
                <div className="bg-green-200  text-green-700 p-2 rounded my-4">
                    {success}
                </div>
            )}
            {error && (
                <div className="bg-red-200  text-red-700 p-2 rounded my-4">
                    {error}
                </div>
            )}
        </>
    );
};

export default Message;
