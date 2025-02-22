import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <section className="section-hero">
        <div className="hero">
          <div className="hero-text-box">
            <h1 className="heading-primary">
            Start Your Freelancing Journey.<br></br>Find jobs, chat with clients, and get paid easily.
            </h1>
            <p className="hero-description">
            Join thousands of freelancers working remotely. Connect with clients, showcase your skills, and start earning today.
            </p>
            <a href="/register" className="btn btn--full margin-right-sm">
              Register
            </a>
            <a href="#how" className="btn btn--outline">Learn more &darr;</a>
            <div className="delivered-meals">
              <div className="delivered-imgs">
                <img src="img/customers/customer-1.jpg" alt="Customer photo" />
                <img src="img/customers/customer-2.jpg" alt="Customer photo" />
                <img src="img/customers/customer-3.jpg" alt="Customer photo" />
                <img src="img/customers/customer-4.jpg" alt="Customer photo" />
                <img src="img/customers/customer-5.jpg" alt="Customer photo" />
                <img src="img/customers/customer-6.jpg" alt="Customer photo" />
              </div>
              <p className="delivered-text">
                <span>Join!</span> without worry..
              </p>
            </div>
          </div>
          <div className="hero-img-box">
            <picture>
              <source srcSet="/imagef3.png" type="image/webp" />
              <img
                src="/imagef3.png"
                className="hero-img"
                alt="Woman enjoying food, meals in storage container, and food bowls on a table"
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="section-featured">
        <div className="container">
          <h2 className="heading-featured-in">As featured in</h2>
          <div className="logos">
            <img src="/imagef5.png" alt="Techcrunch logo" />
            <img src="img/logos/business-insider.png" alt="Business Insider logo" />
            <img src="img/logos/the-new-york-times.png" alt="The New York Times logo" />
            <img src="img/logos/forbes.png" alt="Forbes logo" />
            <img src="img/logos/usa-today.png" alt="USA Today logo" />
          </div>
        </div>
      </section>

      <section className="section-how" id="how">
        <div className="container">
          <span className="subheading">How it works</span>
          <h2 className="heading-secondary">
            Your daily dose of health in 3 simple steps
          </h2>
        </div>

        <div className="container grid grid--2-cols grid--center-v">
          <div className="step-text-box">
            <p className="step-number">01</p>
            <h3 className="heading-tertiary">Tell us what you like (and what not)</h3>
            <p className="step-description">
              Never again waste time thinking about what to eat! Omnifood AI
              will create a 100% personalized weekly meal plan just for you.
              It makes sure you get all the nutrients and vitamins you need,
              no matter what diet you follow!
            </p>
          </div>
          <div className="step-img-box">
            <img
              src="/imagef5.png"
              className="step-img"
              alt="iPhone app preferences selection screen"
            />
          </div>
          <div className="step-img-box">
            <img
              src="/imagef4.png"
              className="step-img"
              alt="iPhone app meal approving plan screen"
            />
          </div>
          <div className="step-text-box">
            <p className="step-number">02</p>
            <h3 className="heading-tertiary">Approve your weekly meal plan</h3>
            <p className="step-description">
              Once per week, approve the meal plan generated for you by Omnifood
              AI. You can change ingredients, swap entire meals, or even add
              your own recipes.
            </p>
          </div>
          <div className="step-text-box">
            <p className="step-number">03</p>
            <h3 className="heading-tertiary">Receive meals at convenient time</h3>
            <p className="step-description">
              Best chefs in town will cook your selected meal every day, and we
              will deliver it to your door whenever works best for you. You can
              change delivery schedule and address daily!
            </p>
          </div>
          <div className="step-img-box">
            <img
              src="/imagef6.png"
              className="step-img"
              alt="iPhone app preferences selection screen"
            />
          </div>
        </div>
         {/* BOLD TEXT */}
      <h2 className="register-text">Register and enjoy your dream job!!</h2>

{/* Bouncing Register Button */}
<a href="/register" className="btn btn--full margin-right-sm">
              Register
            </a>
 

      </section>
    </>
  );
};

export default HomePage;
