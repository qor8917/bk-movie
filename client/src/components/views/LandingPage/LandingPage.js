import React, { useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import { API_KEY, API_URL } from '../../Config';

function LandingPage() {
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(endpoint)
      .then((r) => r.json())
      .then((r) => console.log(r));
  }, []);

  return (
    <div style={{ width: '100%', margin: '0' }}>
      {/* 메인이미지 */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Movies by latest</h2>
        <hr />
        {/* 무비카드 */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
