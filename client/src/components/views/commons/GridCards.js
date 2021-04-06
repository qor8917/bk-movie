import React from 'react';
import { Col } from 'antd';

function GridCards({ image, movieId, movieName }) {
  return (
    <Col lg={6} md={8} sm={12} xs={24}>
      <div style={{ position: 'relative' }}>
        <a href={`/movie/${movieId}`}>
          <img
            style={{
              width: '100%',
            }}
            src={image}
            alt={movieName}
          />
        </a>
      </div>
    </Col>
  );
}

export default GridCards;
