import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import GridCards from '../commons/GridCards';
import Mainimage from './section/Mainimage';
import { Row } from 'antd';
function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [mainMovieImage, setmainMovieImage] = useState(null);
  const [CurrentPage, serCurrentPage] = useState(0);
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };
  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((r) => r.json())
      .then((r) => {
        setMovies([...Movies, ...r.results]);
        setmainMovieImage(r.results[0]);
        serCurrentPage(r.page);
        console.log(r);
      });
  };

  return (
    <div style={{ width: '100%', margin: '0' }}>
      {/* 메인이미지 */}

      {mainMovieImage && (
        <Mainimage
          image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
          title={mainMovieImage.original_title}
          text={mainMovieImage.overview}
        />
      )}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Movies by latest</h2>
        <hr />
        {/* 무비카드 */}

        <Row>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
