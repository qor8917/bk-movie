import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
function Favorite({ movieId, movie, userFrom }) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle: movie.title,
    moviePost: movie.backdrop_path,
    movieRunTime: movie.runtime,
  };

  useEffect(() => {
    axios.post('/api/favorite/favoriteNumber', variables).then((r) => {
      if (r.data.success) {
        setFavoriteNumber(r.data.favoriteNumber);
      } else {
        alert('숫자 정보를 가져오는데 실패 했습니다.');
      }
    });
    axios.post('/api/favorite/favorited', variables).then((r) => {
      if (r.data.success) {
        setFavorited(r.data.favorited);
      } else {
        alert('숫자 정보를 가져오는데 실패 했습니다.');
      }
    });
  }, []);
  const onToggleFavorite = () => {
    if (Favorited) {
      axios.post('/api/favorite/removeFromFavorite', variables).then((r) => {
        if (r.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
        }
      });
    } else {
      axios.post('/api/favorite/addToFavorite', variables).then((r) => {
        if (r.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
        }
      });
    }
  };
  return (
    <div>
      <Button onClick={onToggleFavorite}>
        {Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
