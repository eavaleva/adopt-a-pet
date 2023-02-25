import React, { useEffect, useState } from 'react';
import { getPetTypes } from '../../api/PetFinder';
import Logo from '../../assets/logo.svg';
import Search from '../search';
import { NavLink } from 'react-router-dom';

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
        {/* This link should only have the to prop */}
        <NavLink to="/">
          <img src={Logo} alt="adorePets" />
        </NavLink>
        <Search />
      </div>
      <ul className="nav-links">
        <li>
          {/* This link should have an activeClassName and exact prop */}
          <NavLink
            to="/"
            className="nav-link"
          >
            All Pets
          </NavLink>
        </li>
        {petTypes
          ? petTypes.map((type) => (
            <li>
              {/* These links should have an activeClassName prop */}
              <NavLink
                to={`/${type._links.self.href.split('/').pop()}`}
                key={type.name}
                className="nav-link"
                activeClassName="nav-link-active"
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
