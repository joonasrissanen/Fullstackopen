import React from 'react';

interface HeaderProps {
  name: string
}

const Header: React.FC<HeaderProps> = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>
};

export default Header;