import { Popover } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IMAGE_BASE_URL } from '../../Config';
import Favorite from '../MovieDetail/Sections/Favorite';
import './favorite.css';
function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  useEffect(() => {
    axios
      .post('/api/favorite/getFavoritedMovies', {
        userFrom: localStorage.getItem('userId'),
      })
      .then((r) => {
        if (r.data.success) {
          console.log(r.data.favorited);
          setFavorites(r.data.favorited);
        } else {
          alert('영화 정보를 가져오는데 실패 했습니다.');
        }
      });
  }, []);

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    axios
      .post('/api/favorite/removeFromFavoriteOnList', variables)
      .then((r) => {
        if (r.data.success) {
          axios
            .post('/api/favorite/getFavoritedMovies', {
              userFrom: localStorage.getItem('userId'),
            })
            .then((r) => {
              if (r.data.success) {
                console.log(r.data.favorited);
                setFavorites(r.data.favorited);
              } else {
                alert('영화 정보를 가져오는데 실패 했습니다.');
              }
            });
        } else {
          alert('리스트를 지우는데 실패 했습니다.');
        }
      });
  };

  const renderCards = Favorites.map((item, index) => {
    const content = (
      <div>
        {item.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${item.moviePost}`} />
        ) : (
          'no-image'
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${item.movieTitle}`}>
          <td>{item.movieTitle}</td>
        </Popover>

        <td>{item.movieRunTime} mins</td>
        <td>
          <button onClick={() => onClickDelete(item.movieId, item.userFrom)}>
            Remove
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
