import React from 'react';
import '../styles/tailwind.css';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className='max-w-sm rounded-lg overflow-hidden shadow-lg p-6 m-4 bg-white'>
            <div className='font-bold text-xl mb-2 text-gray-800'>{title}</div>
            <p className='text-gray-700 text-base'>{children}</p>
        </div>
    );
};

export default Card;
