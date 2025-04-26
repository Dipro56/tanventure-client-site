import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between w-full bg-white shadow-2xl px-40 py-5">
      <p className="text-black text-xl">Logo</p>

      <div className="flex gap-5">
        <nav className="px-2">Home</nav>
        <nav className="px-2">Home</nav>
        <nav className="px-2">Home</nav>
        <nav className="px-2">Home</nav>
      </div>

      <p className="text-black text-xl">Login</p>      
    </header>
  );
};

export default Header;
