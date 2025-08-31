import React from 'react';
import '../styles/tailwind.css';
interface CardProps {
    title: string;
    children: React.ReactNode;
}
declare const Card: React.FC<CardProps>;
export default Card;
