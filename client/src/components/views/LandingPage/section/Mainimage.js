import React from 'react';
import { useMediaQuery } from 'react-responsive';
const Mainimage = ({ image, title, text }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 1224px)',
  });
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        height: 500,
        backgroundSize: `${isDesktopOrLaptop ? 'cover' : 'contain'}`,
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          maxWidth: '500px',
          bottom: '2rem',
          marginLeft: '2rem',
        }}
      >
        <h2 style={{ color: 'white' }}>{title}</h2>
        <p style={{ color: 'white', fontSize: '1rem' }}>{text}</p>
      </div>
    </div>
  );
};

export default Mainimage;
