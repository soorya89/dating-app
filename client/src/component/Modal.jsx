// src/components/CustomModal.js
import React, { useEffect, useRef } from 'react';


const CustomModal = ({ isOpen, onRequestClose, children }) => {

    if (!isOpen) return null;

    return (
       
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-4  flex justify-between items-center">
                    <div></div>
                    <span className="text-gray-800 text-lg font-semibold  ">Edit Profile</span>
                    <button 
                        className="text-gray-500 hover:text-gray-700" 
                        onClick={onRequestClose}
                    >
                        ×
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
       
    );
};

export default CustomModal;
