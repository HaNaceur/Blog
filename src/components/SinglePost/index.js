import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import NotFound from '../NotFound';

import './styles.scss';

function SinglePost({ posts }) { // on recupère la liste des posts de Blog via les props
  // on recupere le parametre postId,
  // déclaré dans la props path de la route dans Blog
  // <Route path="/post/:postId" element={<SinglePost />} />
  const { postId } = useParams();

  // on essaye de retrouver le post désigné par le paramètre dans l'url (attention le params est un string)
  const postFound = posts.find((post) => post.id === Number(postId));

  if (!postFound) {
    // si on le trouve pas on retourne la page de 404
    return <NotFound />;
  }

  return (
    <article className="single">
      <h2 className="post-title">{postFound.title}</h2>
      <div className="post-category">{postFound.category}</div>
      <p
        className="post-excerpt"
        dangerouslySetInnerHTML={{ __html: postFound.excerpt }}
      />
    </article>
  );
}

SinglePost.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
  })).isRequired,
};

export default React.memo(SinglePost);
