import React, { useEffect, useState, NavLink } from 'react';
import { getPetTypes } from '../../api/PetFinder';
import Logo from '../../assets/logo.svg';
import Search from '../search';

const Navigation = () => {
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    async function getPetTypesData() {
      const { types } = await getPetTypes();
      setPetTypes(types);
    }

    getPetTypesData();
  }, []);

  return (
    <nav>
      <div className="nav-logo">
        <img src={Logo} alt="Petlover" />
        <Search />
      </div>
      <ul className="nav-links">
        <li key="all">
          {/* This link should have an activeClassName and exact prop */}
          <NavLink
            href="/"
            activeClassName=".nav-link-active"
          >
            All Pets
          </NavLink>
        </li>
        {petTypes
          ? petTypes.map((type) => (
              <li key={type.name}>
                {/* These links should have an activeClassName prop */}
              <NavLink
                  href={`/${type._links.self.href.split('/').pop()}`}
                  key={type.name}
                  activeClassName=".nav-link-active"
                >
                  {type.name}s
              </NavLink>{' '}
              </li>
            ))
          : 'Loading...'}
      </ul>
    </nav>
  );
};

export default Navigation;
