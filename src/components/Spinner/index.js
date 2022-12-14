import React from 'react';
import './styles.scss';

// == Composant
function Spinner() {
  return <div className="spinner" />;
}

// == Export
export default React.memo(Spinner);
