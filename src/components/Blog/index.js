import React, { useState } from 'react';
import classNames from 'classnames';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

// == Composant
function Blog() {
  const [zenMode, setZenMode] = useState(false);

  const toggleZenMode = () => {
    setZenMode(!zenMode);
  };

  return (
    <div className={classNames('blog', { 'blog--zen': zenMode })}>
      <Header
        categories={categoriesData}
        zenMode={zenMode}
        toggleZenMode={toggleZenMode}
      />
      <Posts
        posts={postsData}
      />
      <Footer />
    </div>
  );
}

// == Export
export default Blog;
