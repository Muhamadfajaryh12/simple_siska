import React from "react";

const PreviewTugasModal = ({ preview }) => {
    return (
        <div style={{ width: "100%", height: "600px" }}>
            <iframe
                src={`http://127.0.0.1:8000/storage/${preview}`}
                frameBorder="0"
                width="100%"
                height="100%"
            ></iframe>
        </div>
    );
};

export default PreviewTugasModal;
