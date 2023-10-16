import React from 'react';
import '../css/styles.css'
import Slider from 'react-slick';
import profile1 from  "../assets/profile-pic-1.jpg"
import profile2 from  "../assets/profile-pic-2.jpg"
import profile3 from  "../assets/profile-pic-3.jpg"
import profile4 from  "../assets/profile-pic-4.jpg"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
  const settings = {
    dots: false, // Muestra puntos de navegación
    infinite: false, // Permite un desplazamiento infinito
    speed: 500, // Velocidad de transición en milisegundos
    slidesToShow: 2.29, // Cantidad de elementos visibles a la vez
    slidesToScroll: 1, // Cantidad de elementos a desplazar
    arrows:false // Oculta las flechas
  };

  return (
    <Slider {...settings}>
      <div>
      <div class="swiper-slide">
            <div class="client__card">
              <img src={profile1} alt="client" />
              <div>
                <h4>Andress Mount</h4>
                <p>
                  Como partido politico proponemos:
                  <p>* Propuesta 1</p>
                  <p>* Propuesta 2</p>
                  <p>* Propuesta 3</p>
                </p>
              </div>
            </div>
          </div>
      </div>
      <div class="swiper-slide">
            <div class="client__card">
              <img src={profile2} alt="client" />
              <div>
                <h4>Sarah Anderson</h4>
                <p>
                  Como partido politico proponemos:
                  <p>* Propuesta 1</p>
                  <p>* Propuesta 2</p>
                  <p>* Propuesta 3</p>
                </p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="client__card">
              <img src={profile3} alt="client" />
              <div>
                <h4>John Roberts</h4>
                <p>
                  Como partido politico proponemos:
                  <p>* Propuesta 1</p>
                  <p>* Propuesta 2</p>
                  <p>* Propuesta 3</p>
                </p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="client__card">
              <img src={profile4} alt="client" />
              <div>
                <h4>David Ramirez</h4>
                <p>
                  Como partido politico proponemos:
                  <p>* Propuesta 1</p>
                  <p>* Propuesta 2</p>
                  <p>* Propuesta 3</p>
                </p>
              </div>
            </div>
          </div>
    </Slider>
  );
};

export default ImageSlider;

