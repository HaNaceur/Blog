import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<div>Accueil</div>} />
        <Route path="/angular" element={<div>Angular c'est de la merde</div>} />
        <Route path="/post" element={<div>Un post</div>} />
        <Route path="/post/:postId" element={<div>le post 42</div>} />
        <Route path="*" element={<div>ici c'est le 404</div>} />

        {/* <Posts
        posts={postsData}
      /> */}
      </Routes>
      <Footer />
    </div>
  );
}

// == Export
export default Blog;
