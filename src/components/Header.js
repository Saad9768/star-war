import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Star Wars Info</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/people">Characters</Link>
        <Link to="/planets">Planets</Link>
        <Link to="/starships">Starships</Link>
      </nav>
    </header>
  );
}

export default Header;
