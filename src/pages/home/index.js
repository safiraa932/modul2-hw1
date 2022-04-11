import React from 'react';
import Album from '../../components/Album/index';
import data from '../../data';

function Home() {
  return (
    <section className="suggested-section">
      <div className="layout">
        <div className="suggested-list">
          <Album data={data} />
          {/* {data.map((item) => (
              <Album key={item.id} data={item} />
            ))} */}
        </div>
      </div>
    </section>
  );
}
export default Home;
