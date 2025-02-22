import jose from "../../img/jose.jpg"
import david from "../../img/david.jpg"
import einar from "../../img/einar.webp"
import dorian from "../../img/dorian.png"
import React, { useState, useEffect } from "react";
import '../../styles/aboutUs.css'
import { Loader } from "../component/loader";
import { Footer } from '../component/footer';



export const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);




  return (isLoading) ? <Loader /> : (
    <div className="card-container-about-us">
      <div className="card-About-Us">
        <div className="title-about-us">
          <h1 className="developer">DEVELOPER TEAM</h1>
        </div>
        <div className="card-Us">
          <img className="card-img-about-us" src={dorian} />
          <div className="card-content-about-us">
            <h3 className="card-title-name-about-us">Dorian Z.</h3>
            <p className="department">Software Developer</p>
            <p className="card-description-about-us">
              "A veces desorganizado, a veces un desatre! Pero eso no me quita lo guapo"
            </p>
            <a href="https://linkedin.com/in/dorian-zuluaga-08132075">
              <button className="card-button-about-me">About me</button>
            </a>
          </div>
        </div>

        <div className="card-Us">
          <img className="card-img-about-us" src={einar} />
          <div className="card-content-about-us">
            <h3 className="card-title-name-about-us">Einar F.</h3>
            <p className="department">Software Developer</p>
            <p className="card-description-about-us">
              "A veces el rey de la concentración, y otras veces el emperador de la distracción"
            </p>
            <a href="https://www.linkedin.com/in/dorian-zuluaga-14873b251/">
              <button className="card-button-about-me">About me</button>
            </a>
          </div>
        </div>

        <div className="card-Us">
          <img className="card-img-about-us" src={david} />
          <div className="card-content-about-us">
            <h3 className="card-title-name-about-us">David G.</h3>
            <p className="department">Software Developer</p>
            <p className="card-description-about-us">
              "A veces la persona más puntual del mundo, y otras veces el rey del "llego en 5 minutos!"
            </p>
            <a href="https://www.linkedin.com/in/dorian-zuluaga-14873b251/">
              <button className="card-button-about-me">About me</button>
            </a>
          </div>
        </div>

        <div className="card-Us">
          <img className="card-img-about-us" src={jose} />
          <div className="card-content-about-us">
            <h3 className="card-title-name-about-us">Jose </h3>
            <p className="department">Software Developer</p>
            <p className="card-description-about-us">
              "A veces soy un ninja de la programación, y otras veces un atleta de la procrastinación!"
            </p>
            <a href="https://www.linkedin.com/in/jose-martin-perez-29b188139">
              <button className="card-button-about-me">About me</button>
            </a>
          </div>
        </div>
      </div>
      <Footer className="footer-about-us" />
    </div>
  );
}