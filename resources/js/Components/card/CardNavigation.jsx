import { Link } from "@inertiajs/react";
import React from "react";

const CardNavigation = ({ data }) => {
    return (
        <Link href={data.link}>
            <div className="bg-blue-500 rounded-md p-4 flex flex-col gap-4 items-center text-white justify-center h-32 hover:bg-blue-800">
                {data.icon}
                <h1 className="font-semibold text-center text-xl">
                    {data.name}
                </h1>
            </div>
        </Link>
    );
};

export default CardNavigation;
