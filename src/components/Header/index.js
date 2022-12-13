import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Header({ categories, toggleZenMode, zenMode }) {
  return (
    <header className="menu">
      <nav>
        {categories.map((category) => (
          <a
            key={category.route}
            className="menu-link" // 'menu-link--selected'
            href={category.route}
          >
            {category.label}
          </a>
        ))}
        <button
          className="menu-btn"
          type="button"
          onClick={toggleZenMode}
        >
          {`${zenMode ? 'Désactiver' : 'Activer'} le mode zen`}
        </button>
      </nav>
    </header>
  );
}
Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  toggleZenMode: PropTypes.func.isRequired,
  zenMode: PropTypes.bool.isRequired,
};

export default React.memo(Header);
