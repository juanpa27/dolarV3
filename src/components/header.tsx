import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  logo?: string;
  title?: string;
  links?: Array<{ label: string; href: string }>;
}

const Header: React.FC<HeaderProps> = ({ logo, title, links }) => {
  return (
    <header className="bg-gray-800 text-white px-4 py-4 flex items-center justify-between">
      <div className="flex items-center">
        {logo && <img src={logo} alt={title || 'Logo de tu app'} className="h-8" />}
        {title && <h1 className="text-xl font-bold ml-4">{title}</h1>}
      </div>
      <nav>
        {links?.map((link) => (
          <Link key={link.href} to={link.href} className="text-lg font-medium mr-4">
            {link.label}
          </Link>
        ))}
      </nav>
    </header> 
  );
};

export default Header;
