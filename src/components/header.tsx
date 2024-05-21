import React from 'react';
import { ModeToggle } from "@/components/mode-toggle"

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-12 bg-black-800 flex items-center justify-between px-4">
      <h1 className="text-lg font-bold">Dolar</h1>
      
      <ModeToggle />

    </header>
  );
};

export default Header;