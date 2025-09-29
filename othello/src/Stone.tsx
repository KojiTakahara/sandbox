import React from 'react';
import './Stone.css';

interface StoneProps {
  color: 'black' | 'white' | 'empty';
}

const Stone: React.FC<StoneProps> = ({ color }) => {
  return <div className={`stone ${color}`}></div>;
};

export default Stone;
