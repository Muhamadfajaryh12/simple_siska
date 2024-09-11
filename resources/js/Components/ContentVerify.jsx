import React from "react";

const ContentVerify = ({ verify }) => {
    return (
        <div>
            {verify == 1 ? (
                <div className="bg-green-400 text-white font-semibold p-2 rounded-lg">
                    Telah Disetujui
                </div>
            ) : (
                <div className="bg-red-400 text-white font-semibold p-2 rounded-lg">
                    Belum Disetujui
                </div>
            )}
        </div>
    );
};

export default ContentVerify;
