import React, { useEffect, useState } from 'react'
//css
import '../css/styles.css'
//imágenes
import umms from "../assets/UMSS.png"
import header1 from "../assets/header-1.jpg"
import votacion1 from "../assets/votacion1.jpg"
import partido1 from "../assets/partido1.jpg"
import partido2 from "../assets/partido2.png"
import partido3 from "../assets/partido3.jpg"
import ImageSlider from '../components/Sidebar'
import scrollreveal from 'scrollreveal'
const IndexPage = () => {
const navLinks = document.getElementById("nav-links");
//const menuBtnIcon = menuBtn.querySelector("i");
const [isNavOpen, setIsNavOpen] = useState(false);
const menuAbrir= (e) => {
  setIsNavOpen(!isNavOpen);
};

const cerrarMenu=(e)=>{
  navLinks.classList.remove("open");
}
useEffect(() => {
  const scrollReveal = scrollreveal();
  
  const scrollRevealOption = {
    distance: '50px',
    origin: 'bottom',
    duration: 1000,
  };

  // header container
  scrollReveal.reveal('.header__image img', {
    ...scrollRevealOption,
    interval: 500,
  });
  // about container
  scrollReveal.reveal(".about__card", {
    ...scrollRevealOption,
    interval: 500,
  });
  // portfolio container
  scrollReveal.reveal(".portfolio__card", {
    ...scrollRevealOption,
    interval: 500,
  });
  // news container
  scrollReveal.reveal(".news__card", {
    ...scrollRevealOption,
    interval: 500,
  });
  // Limpia ScrollReveal en el desmontaje del componente
  return () => {
    scrollReveal.destroy();
  };
}, []);
  return (
    <div>
      <nav class="cabecera">
      <a href="#" > <img src={umms} class="nav__logo" alt=""/></a>
      <ul className={`nav__links ${isNavOpen? 'open' : ''}`} id="nav-links">
        <li class="link2" onClick={cerrarMenu}><a href="#home">Inicio</a></li>
        <li class="link2" onClick={cerrarMenu}><a href="#about">Sobre Nosotros</a></li>
        <li class="link2" onClick={cerrarMenu}><a href="#portfolio">Partidos</a></li>
        <li class="link2" onClick={cerrarMenu}><a href="#client">Propuestas</a></li>
        <li class="link2" onClick={cerrarMenu}><a href="/Login">Ingresar</a></li>
       

      </ul>
      <div class="nav__menu__btn" id="menu-btn">
        <span><i className={`${isNavOpen ? 'ri-close-line' : 'ri-menu-3-line'}`} onClick={()=>menuAbrir()}></i></span>
      </div>
    </nav>

    <header class="section__container header__container" id="home">


      <div class="header__content">
        <div class="header-content">
          <h1 class="title">SISTEMA DE ELECCIONES UMSS</h1>
      </div>

      </div>

      <div class="header__image">
        <img src={header1} alt="header" />
        <img src={votacion1} alt="header" />
      </div>
    </header>

    <section class="section__container about__container" id="about">
      <div class="about__header">
        <div class="about__image">
          <img src={umms} alt="about" />
        </div>
        <div class="about__content">
          <p class="section__subheader">Sobre Nosotros</p>
          <h2 class="section__header">Aspectos institucionales</h2>
          <p class="paragraph">
            La Universidad Mayor de San Simón (UMSS), fundada por Ley del 5 de noviembre de 1832, 
            durante la Presidencia del Mcal. Andrés de Santa Cruz, es una entidad autónoma, de derecho público, 
            constituida por docentes, estudiantes y personal administrativo, con personería jurídica propia,
             reconocida por la Constitución Política del Estado. Cubre el área de la educación superior con sus 
             funciones de enseñanza-aprendizaje, investigación científica y tecnológica e interacción social universitaria. 
             La UMSS pertenece al Sistema de Universidades Públicas agrupadas en torno al Comité Ejecutivo de
              la Universidad Boliviana (CEUB). La actividad académica y administrativa de la UMSS se sujeta, 
              tanto a las leyes bolivianas como a la normativa interna, expresada en el Estatuto Orgánico.
               A partir de 1930 (Referéndum) y 1931 (Decreto Ley), la Universidad Boliviana asume la Autonomía 
               Universitaria, cuya esencia reside en la libertad del pensamiento para desarrollar el conocimiento
                científico, en función de sus principios, fines y objetivos, tal como establece la Constitución
                 Política del Estado. La Autonomía Universitaria es un derecho imprescriptible e inalienable, 
                 que implica obligaciones y reconoce derechos para autoridades, docentes, estudiantes y dependientes
                  administrativos; y se entiende como la capacidad que tiene la Universidad para la libre administración
                   de su patrimonio, la elección de sus Autoridades, el nombramiento de su personal docente y administrativo,
                    la elaboración y aprobación de sus estatutos, planes de estudio, reglamentos y presupuestos anuales,
                     así como la capacidad que se le reconoce para aceptar legados y donaciones, para celebrar contratos y 
                     negociar empréstitos con garantía de sus bienes y recursos, previa aprobación legislativa. La base de
                      la organización democrática de la UMSS descansa en la decisión soberana de la totalidad de docentes y
                       estudiantes, expresada mediante el voto universal y el co-gobierno paritario docente-estudiantil.
          </p>
          <button class="btn">Learn More</button>
        </div>
      </div>
      <div class="about__grid">
        <div class="about__card">
          <span><i class="ri-pen-nib-line"></i></span>
          <div>
            <h4>Tribunal Electoral</h4>
            <p>
              Our designers and content creators are committed to delivering
              visually stunning and engaging digital content.
            </p>
          </div>
        </div>
        <div class="about__card">
          <span><i className='ri-layout-masonry-line'></i></span>
          <div>
            <h4>Cómite Electoral</h4>
            <p>
              We stay at the forefront of technological advancements, ensuring
              that your digital presence beautiful and performant.
            </p>
          </div>
        </div>
        <div class="about__card">
          <span><i class="ri-checkbox-line"></i></span>
          <div>
            <h4>Jurados Electorales</h4>
            <p>
              We understand that your digital presence should not just look
              good; it should deliver traffic, engagement, and conversions.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section__container portfolio__container" id="portfolio">
      <div class="portfolio__header">
        <div>
        
          <h2 class="section__header">PARTIDOS POLÍTICOS</h2>
        </div>
        <div>
          <p class="paragraph">
            A continuación podemos observar el logotipo de cada partido político
          </p>
          <a href="#" class="btn__link">
            Ver todo <span><i class="ri-arrow-right-line"></i></span>
          </a>
        </div>
      </div>
      <div class="portfolio__grid">
        <div class="portfolio__card">
          <img src={partido1} alt="portfolio" />
        </div>
        <div class="portfolio__card">
          <img src={partido2} alt="portfolio" />
        </div>
        <div class="portfolio__card">
          <img src={partido3} alt="portfolio" />
        </div>
      </div>
    </section>

    <section class="section__container client__container" id="client">
      <div class="client__header">
        <div>
          <p class="section__subheader">Propuestas</p>
        </div>
        <div>
          <a href="#" class="btn__link">
            Ver todo <span><i class="ri-arrow-right-line"></i></span>
          </a>
        </div>
      </div>
      {/* <!-- Slider main container --> */}
      <ImageSlider/>
    </section>
    
 

    <footer class="section__container footer__container">
      <div class="footer__col">
        <h5><a href="#">Contactános</a></h5>
      </div>
      <div class="footer__col">
        <h4>Secretaria General</h4>
        <p><b>"Correo:"</b> <span>s.gral@umss.edu.bo</span></p>
        <p>"Telf:" <span>(+591) 4 4525161</span></p>
        <p>"Fax:" <span>(+591) 4 4524772</span></p>
      </div>
      <div class="footer__col">
        <h4>Información General</h4>
        <p>
          <b>"Correo:" <span> informaciones@umss.edu.bo</span></b>
        </p>
      </div>
      <div class="footer__col">
        
        <div class="footer__socials">
          <h4>Siguenos en nuestras redes</h4>
          <div>
            <a href="https://www.facebook.com/UmssBolOficial"><i class="ri-facebook-box-fill"></i></a>
            <a href="https://www.instagram.com/umssboloficial/"><i class="ri-instagram-line"></i></a>
          </div>
        </div>
      </div>
    </footer>
    <div class="footer__bar">
      Copyright © 2023 Web Design Mastery. All rights reserved.
    </div>
    </div>
  )
}

export default IndexPage