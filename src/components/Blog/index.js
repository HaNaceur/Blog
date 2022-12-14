import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
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
  const [errorMessage, setErrorMessage] = useState(null);
  const [zenMode, setZenMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // un boolean pour savoir si on affiche les Route Posts ou un spinner

  const toggleZenMode = () => {
    setZenMode(!zenMode);
  };

  const loadData = async () => { // on peut mettre la fonction en asynchrone (on prepare l'appel API)
    setIsLoading(true); // on met isLoading à true avant de charger les données
    setErrorMessage(null); // on reset les messages d'erreurs
    try {
      const postResponse = await axios.get('https://oclock-open-apis.vercel.app/api/blog/pssosts');
      setPosts(postResponse.data);
      const categoriesResponse = await axios.get('https://oclock-open-apis.vercel.app/api/blog/categories');
      setCategories(categoriesResponse.data);
    }
    catch (err) {
      // il y a eu une erreur on l'enregistre pour l'afficher
      setErrorMessage('Une erreur est survenue lors de la récupération des données.');
    }
    finally {
      setIsLoading(false); // on met isLoading à false après avoir chargé les données
    }
  };

  return (
    <div className={classNames('blog', { 'blog--zen': zenMode })}>
      <Header
        categories={categories}
        zenMode={zenMode}
        toggleZenMode={toggleZenMode}
      />
      <button onClick={loadData}>Charger les données</button>
      {errorMessage && (
        <div className="error">{errorMessage}</div>
      )}
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
          <Route path="/jquery" element={<Navigate to="/React" replace />} />
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
