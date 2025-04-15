import React from "react";
import {
  AiOutlineMobile,
  AiOutlineWifi,
  AiOutlineSetting,
  AiOutlineCloudUpload,
  AiOutlineLock,
  AiOutlineBgColors,
} from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./Landing.css";
import animationData from "./lottie.json";
import background from "./bg.json";
import Lottie from "lottie-react";
import Wave from "./wave.json";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      {/* Header */}
      <nav className="navbar navbar-expand-md navbar-dark fixed-top sticky-navigation">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-sm"></span>
        </button>
        <a className="navbar-brand ps-24" href="#">
        Employee Performance Evaluation
        </a>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-3">
              <a className="nav-link page-scroll" href="#main">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link page-scroll" href="#about">
                About Us
              </a>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link page-scroll" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link page-scroll" href="#testimonials">
                Testimonials
              </a>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link page-scroll" href="#contact">
                Contact
              </a>
            </li>
          </ul>
          <Link to={"/login"} className="btn btn-primary ml-2">
            Login
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <section className="bg-texture hero" id="main">
        <div className="container">
          <div className="row d-md-flex brand">
            <div className="col-md-6 hidden-sm-down wow fadeIn">
              <Lottie animationData={animationData} loop={true} />
            </div>
            <div className="col-md-6 col-sm-12 text-white wow fadeIn">
              <h2 className="pt-4">
                Optimize Your Team's Performance with{" "}
                <b className="text-primary-light">Employee Performance Evaluation</b>
              </h2>
              <p className="mt-5 fs-5">
                In today's fast-paced technology landscape, managing IT
                professional performance is crucial. Talent Trove helps predict
                performance levels and assess work-related stress, offering
                actionable insights to boost productivity and job satisfaction.
              </p>
              <p className="mt-5">
                {/* <a
                  href="#features"
                  className="btn btn-primary mr-2 mb-2 page-scroll"
                >
                  Learn More
                </a> */}
                <Link to={"/login"} className="btn btn-white mb-2 page-scroll">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      {/* <section
        className="bg-white"
        id="about"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto text-center">
              <h2 className="text-primary">About Us</h2>
              <p className="lead mt-4">
                Talent Trove is dedicated to transforming the way IT
                professionals manage their performance and stress levels. Our
                innovative platform leverages cutting-edge machine learning and
                data analytics to provide actionable insights for individuals
                and organizations alike. We are committed to enhancing
                productivity, well-being, and job satisfaction through our
                comprehensive performance management system.
              </p>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              opacity: "10%",
            }}
          >
            <Lottie
              animationData={Wave}
              loop={true}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section> */}

      {/* <Lottie animationData={background} loop={true} /> */}


      {/* Contact Section */}
      {/* <section className="bg-light" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-12 text-center">
              <h2 className="text-primary">Contact Us</h2>
              <p className="lead pt-3">
                Get in touch for more information about Talent Trove.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="4"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Landing;
