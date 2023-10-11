import React from "react";
import SignIn from "./SignIn";
import Register from "./Register";

function Content(){
    return (
        <div>
          <div className="container-fluid first-container">
            <nav className="navbar navbar-expand-lg navbar-bg navbar-light">
              <a className="navbar-brand" >CareerGuru</a>

              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarToggler">
                <ul className="navbar-nav nav-ul">
                  <li className="nav-item">
                    <a className="nav-link" href="#aboutUs">WhyUs</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#Testimonial">Testimonials</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#FAQ">FAQ's</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#Contact">ContactUs</a>
                  </li>
                </ul>

                {/* Login */}
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item ">
                    <a className="nav-link" href="signin">
                      <button className="btn px-5 btn-block btn-outline-dark ">  Login  </button></a>
                  </li>
                </ul>

              </div>
            </nav>

            <img className="landingPhoto" src=".\landingPhoto.avif" />
            <h1 className="tagline">We make Careers!</h1>
            <a className="nav-link" href="register"><button className="btn btn-md  btn-outline-light register-btn" >Register Here </button></a>
            
          </div>

          <div className="container aboutUs" id="aboutUs">
            <h2 className="aboutUs-head"> About Us</h2>
            <p className="aboutUs-para">

              CareerGuru has evolved from being a 'job board' to a global provider of everything you need
              for a successful career. We've been in the pursuit of connecting people with the right job opportunities for
              over two decades now. We understand your needs better than anyone else and know when recruiters are looking
              for someone exactly like you.
            </p>

            <p className="aboutUs-para">
              We live in a world where every experience can be highly personalised, so why should job hunting be any
              different? CareerGuru aims to be the perfect picture of customisation. In a vast sea of opportunities, we can
              fish out the right ones for you by catering to what you need - be it learning new skills, an inclusive
              workplace, mentorship, a fast-track career, a place to hustle or somewhere you can keep things flexible.
            </p>
            <p className="aboutUs-para">
              At the heart of our success and our future is innovation. We are building some of the best technology to
              customise our search results, keeping in mind that your job title doesn't define your potential. So much so
              that two of you from the same field will see completely different results for the same query. Decades of
              industry insights and new-age technology have come together to bring you the perfect career experience.

            </p>
            <p className="aboutUs-para">
              If you are looking for your path to different possibilities, it's time to say Yes Guru!
            </p>
            <div className="row container-fluid">
              <div className="feature-box col-md-4">

                <i className="icon fas fa-check-circle fa-4x"></i>
                <h3 className="feature-title">Job Recommender</h3>
                <p>We update you whenever new jobs are added.</p>
              </div>
              <div className="feature-box col-md-4 ">
                <i className="icon fas fa-heart fa-4x"></i>
                <h3 className="feature-title">Job Guaranteed</h3>
                <p>We made careers of many individuals.</p>
              </div>

              <div className="feature-box col-md-4">
                <i className="icon fas fa-bullseye fa-4x"></i>
                <h3 className="feature-title">Job Notifications</h3>
                <p>Get notified regularly.</p>
              </div>


            </div>

          </div>

          <section className="third-section" id="Testimonial">

            <div id="testimonial-carousel" className="carousel slide" data-ride="false">

              <div className="carousel-inner">

                <div className="carousel-item active container-fluid">
                  <h2 className="testimonial-text">
                    Career Guru helped me in finding my dream job at Atlassian. I loved the
                    overall experience.
                  </h2>
                  <img className="testimonial-image" src="./atlass.png" alt="atlas" />
                  <em> SDE-2, Atlassian</em>
                </div>

                <div className="carousel-item container-fluid">
                  <h2 className="testimonial-text">
                    With CareerGuru I found work at remote dhaba. My salary got hiked by 3 folds.
                  </h2>
                  <img className="testimonial-image" src=".\chef.jfif" alt="chef" />
                  <em>Chef, Santosh Dhaba</em>

                </div>
              </div>


              <a className="carousel-control-prev" href="#testimonial-carousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>

              </a>
              <a className="carousel-control-next" href="#testimonial-carousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </a>

            </div>
          </section>


          <section className="container faq" id="FAQ">
            <h3 className="text-center mb-2 pb-2 text-secondary fw-bold">FAQ</h3>
            <p className="text-center mb-4">
              Find the answers for the most frequently asked questions below
            </p>

            <div className="row">
              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary"><i className="far fa-paper-plane text-primary pe-2"></i> A simple
                  question?</h6>
                <p>
                  <strong><u>Absolutely!</u></strong> We work with top payment companies which guarantees
                  your
                  safety and
                  security. All billing information is stored on our payment processing partner.
                </p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary"><i className="fas fa-pen-alt text-primary pe-2"></i> A question
                  that
                  is longer then the previous one?</h6>
                <p>
                  <strong><u>Yes, it is possible!</u></strong> You can cancel your subscription anytime in
                  your
                  account. Once the subscription is
                  cancelled, you will not be charged next month.
                </p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary"><i className="fas fa-user text-primary pe-2"></i> A simple
                  question?
                </h6>
                <p>
                  Currently, we only offer monthly subscription. You can upgrade or cancel your monthly
                  account at any time with no further obligation.
                </p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary"><i className="fas fa-rocket text-primary pe-2"></i> A simple
                  question?
                </h6>
                <p>
                  Yes. Go to the billing section of your dashboard and update your payment information.
                </p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary"><i className="fas fa-home text-primary pe-2"></i> A simple
                  question?
                </h6>
                <p><strong><u>Unfortunately no</u>.</strong> We do not issue full or partial refunds for any
                  reason.</p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <h6 className="mb-3 text-primary"><i className="fas fa-book-open text-primary pe-2"></i> Another
                  question that is longer than usual</h6>
                <p>
                  Of course! We’re happy to offer a free plan to anyone who wants to try our service.
                </p>
              </div>
            </div>
          </section>
        </div>
        );
}
export default Content;


