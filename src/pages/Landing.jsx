import React from "react";
import { Link } from "react-router-dom";

//-------------------------------------------CSS imports
import "../styles/landingpage.css";

function Landing() {
  return (
    <div className="full-page-container">
      <section className="top-area-container">
        <div className="A-logo-description-landingpage">
          <img
            src="./images/a-icon-white.png"
            alt="The letter A - it's the app's small logotype"
            className="a-logo-img"
          />
          <h2>Reach new heights, with Team Comms.</h2>
        </div>

        <div className="signin-login-buttons-area">
          <Link to="/login"><button className="signin-login-buttons">Login</button></Link>
          <Link to="/signup"><button className="signin-login-buttons signup">Signup</button></Link>
        </div>

      </section>

      <section className="middle-area-container">

        <div className="middle-area-container-left-area">
          <div className="info-header">
            <img
              src="./images/landing-small-img-1.png"
              alt=""
              className="small-images-landingpage img-title"
            />
            <h5 className="img-title">A safe storage</h5>
          </div>
          
          <p class="middle-section-text-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae totam quis, temporibus veritatis nulla ratione, dolor ad modi pariatur beatae repellendus molestias deserunt quia eius, earum consectetur inventore laudantium?</p>

          <button className="learn-more-button">Learn More</button>
        </div>


        <div className="middle-area-container-right-area">
          <div className="info-header">
            <img
              src="./images/landing-small-img-2.png"
              alt=""
              className="small-images-landingpage img-title"
            />
            <h5 className="img-title">Improve in-house Communication</h5>
          </div>

            <p class="middle-section-text-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae totam quis, temporibus veritatis nulla ratione, dolor ad modi pariatur beatae repellendus molestias deserunt quia eius, earum consectetur inventore laudantium?</p>

            <button className="learn-more-button">Learn More</button>
        </div>
      </section>

      <footer class="footer-distributed">
        <div class="footer-left">
          <h3>
            Team<span id="comms-color-footer">Comms</span>
          </h3>

          <p class="footer-links">
            <a href="#" class="link-1">
              Home
            </a>

            <a href="#">Calendar</a>

            <a href="#">Photo Gallery</a>

            <a href="#">About</a>

            <a href="#">Faq</a>

            <a href="#">Contact</a>
          </p>

          <p class="footer-company-name">Team Comms © 2023</p>
        </div>

        <div class="footer-center">
          <div>
            <i class="fa fa-map-marker"></i>
            <p>
              <span>127 Rua da Boa Esperança</span> Curral de Moinas, Braga
            </p>
          </div>

          <div>
            <i class="fa fa-phone"></i>
            <p>291 456 789</p>
          </div>

          <div>
            <i class="fa fa-envelope"></i>
            <p>
              <a href="mailto:dev@team-comms.com" id="comms-color-footer">dev@company.org</a>
            </p>
          </div>
        </div>

        <div class="footer-right">
          <p class="footer-company-about">
            <span>About the company</span>
            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
            euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>

          <div class="footer-icons">
            
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
