import React from "react";

const LeftPane = ({ children }) => {
    return (
        <div className="sticky top-0 col-span-2 h-screen bg-gray-900 px-10  py-20 text-white">
            <div className="flex h-full flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default LeftPane;
