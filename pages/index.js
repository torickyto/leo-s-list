import React from 'react';
import Layout from '../app/layout'; 
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {

  const films = [
    { id: 1, title: 'Film 1', imageUrl: '/leo1.png' },
    { id: 2, title: 'Film 2', imageUrl: '/leo2.jpg' },
    { id: 3, title: 'Film 3', imageUrl: '/leo3.jpg' },
    // Add more films as needed
  ];

  // Slider settings for react-slick carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Layout>
      <div className="pt-6 flex flex-col items-center">
        <div className="w-full px-4">
          <Slider {...settings}>
            {films.map((film) => (
              <div key={film.id} className="p-2">
                {/* Apply specific styles for cinematic ratio (16:9) and green border */}
                <div className="relative overflow-hidden w-full border-2 border-green-500" style={{ paddingBottom: '56.25%' }}>
                  <img
                    src={film.imageUrl}
                    alt={film.title}
                    className="absolute top-0 left-0 w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Button to View Films */}
        <div className="mt-12">
          <Link legacy legacyBehavior href="/films">
            <a className=" bg-bitterbrown hover:bg-notactuallybrown text-milkbrown text-2xl font-bold py-4 px-8 rounded">
              add/view movies!
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
