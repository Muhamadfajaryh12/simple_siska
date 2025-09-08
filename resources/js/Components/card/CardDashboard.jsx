import React from "react";
import SubText from "../SubText";

const CardDashboard = ({ title, icon, value, color }) => {
    return (
        <div className=" rounded-lg bg-white p-4">
            <SubText text={title} />
            <h1 className="text-5xl text-blue-900 font-extrabold ">{value}</h1>
        </div>
    );
};

export default CardDashboard;
