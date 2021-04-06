import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import Mainimage from '../LandingPage/section/Mainimage';
import Favorite from './Sections/Favorite';
import Movieinfo from './Sections/Movieinfo';

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then((r) => r.json())
      .then((r) => {
        setMovie(r);
      });
  }, []);

  return (
    <div>
      {/* header */}

      <Mainimage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      {/* body */}
      <div style={{ width: '85%', margin: '1em auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Favorite
            movie={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem('userId')}
          />
        </div>
        {/* movie info */}
        <Movieinfo movie={Movie} />
        <br />
        {/* actiors grid*/}
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '2em' }}
        >
          <button>Toggle Actor View</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
