import React from 'react';
import '../styles/tailwind.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300'
        >
            {children}
        </button>
    );
};

export default Button;
