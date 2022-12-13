import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import classNames from 'classnames';

import Header from '../Header';
import Posts from '../Posts';
import Footer from '../Footer';
import NotFound from '../NotFound';
import Spinner from '../Spinner';

// data, styles et utilitaires
import categoriesData from '../../data/categories';
import postsData from '../../data/posts';
import './styles.scss';
import SinglePost from '../SinglePost';

// == Composant
function Blog() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [zenMode, setZenMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // un boolean pour savoir si on affiche les Route Posts ou un spinner

  const toggleZenMode = () => {
    setZenMode(!zenMode);
  };

  const loadData = async () => { // on peut mettre la fonction en asynchrone (on prepare l'appel API)
    setIsLoading(true); // on met isLoading à true avant de charger les données

    setTimeout(() => {
      // on simule un appel API
      setPosts(postsData);
      setCategories(categoriesData);
      setIsLoading(false); // on met isLoading à false après avoir chargé les données
    }, 500);
  };

  return (
    <div className={classNames('blog', { 'blog--zen': zenMode })}>
      <Header
        categories={categories}
        zenMode={zenMode}
        toggleZenMode={toggleZenMode}
      />
      <button onClick={loadData}>Charger les données</button>
      {isLoading ? ( // si isLoading est à true on affiche le Spinner sinon on affiche les Routes
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={(<Posts posts={posts} />)}
          />
          {categories.map(({ route, label }) => ( // on créer une route par categorie
            <Route
              key={route}
              path={route}
              element={(
                <Posts
                  posts={posts.filter((post) => post.category === label)}
                />
            )}
            />
          ))}
          <Route path="/post/:postId" element={<SinglePost posts={posts} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
}

// == Export
export default Blog;
