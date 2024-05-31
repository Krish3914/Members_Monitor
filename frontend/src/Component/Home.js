import { Link, Navigate, useNavigate } from "react-router-dom";
import { HomeHeader } from "./HomeHeader";
import { HomeFooter } from "./HomeFooter";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { isLoggedIn } from "./utils/isLoggedIn";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "./redux/UserSlice";
import { apiURL } from "./utils/commonData";
import { useEffect, useState } from "react";
// import "./Home.css";
const Home = () => {
  const [show,setShow] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  // console.log("this is user info", user);
  const makePayment = async (plan, amount) => {
    return toast.warning("Page under development – stay tuned for the unveiling")

    if (isLoggedIn()) {
      console.log("calling function makePayment");

      // Load the Stripe.js library
      const stripe = await loadStripe(
        "pk_test_51OeFSJSFf8eRBx5tz3sRcOB7SHHkHVB142SpwspPn0hzoJ1D9C7oz18mjjKs9DSqENklC2LDCk2o0COrEK0LIqxl00dNqCuLfn"
      );

      // Define the product data
      const products = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
          email: user.email,
        },

        // ... add more products as needed
      ];

      try {
        // Make a request to the server to create a Stripe Checkout Session
        const response = await axios.post(
          `${apiURL}makepayment`,
          { products }
        );

        // console.log("this is response ", response);
        const updatedUser = { ...user, plan: plan };
        dispatch(addUserData(updatedUser));
        // console.log(updatedUser);
        // Redirect the user to the Checkout page using the session ID
        const result = await stripe.redirectToCheckout({
          sessionId: response.data.id,
        });

        console.log("this is result ", result);

        if (result.error) {
          console.error("Error redirecting to Checkout:", result.error);
        }
      } catch (error) {
        console.error("Error making payment:", error);
      }
    } else {
      toast.error("please login first");
    }
  };

  useEffect(()=>{
    return ()=>{
      toast.dismiss();
    }
  },[])

  return (
    <div className="w-full h-screen" onClick={() => setShow(false)}>
      {/* <div id="preloder">
        <div className="loader"></div>
    </div> */}
      <HomeHeader show={show} setShow={setShow} />
      <section className="hero-section set-bg1 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hero-text">
                <span>MEMBERS RECORD</span>
                <h1>GYM MANAGER</h1>
                <p>
                  Manage your fitness club members pricisely and totally free
                </p>
                <Link to={"/signup"} className="primary-btn">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-pic">
                <img src="img/about-pic.jpg" alt="" />
                <a
                  href="https://www.youtube.com/watch?v=SlPhMPnQ58k"
                  className="play-btn video-popup"
                >
                  <img src="img/play.png" alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-text">
                <h2>Story About Us</h2>
                <p className="first-para">
                  Empowering Gyms with Next-Level Member Management Welcome to
                  Members Monitor, your ultimate solution for seamless gym
                  member management.
                </p>
                <p className="second-para">
                  At Members Monitor, we're passionate about revolutionizing the
                  way gyms handle their memberships. Our cutting-edge software
                  empowers gym owners and managers to effortlessly manage their
                  members, streamline operations, and enhance the overall gym
                  experience.
                </p>
                <a href="#" className="primary-btn">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="services-pic">
                <img src="img/services/service-pic.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="service-items">
                <div className="row">
                  <div className="col-md-6">
                    <div className="services-item bg-gray">
                      <img src="img/services/service-icon-1.png" alt="" />
                      <h4>Innovative Solutions</h4>
                      <p>
                        We pride ourselves on offering innovative software
                        solutions specifically tailored to the needs of gym
                        owners.
                      </p>
                    </div>
                    <div className="services-item bg-gray pd-b">
                      <img src="img/services/service-icon-3.png" alt="" />
                      <h4>User-Friendly Interface</h4>
                      <p>
                        Say goodbye to clunky, outdated systems. Members Monitor
                        boasts an intuitive interface.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="services-item">
                      <img src="img/services/service-icon-2.png" alt="" />
                      <h4>Seamless Integration</h4>
                      <p>
                        Our software seamlessly integrates with existing gym
                        systems, ensuring a smooth transition.
                      </p>
                    </div>
                    <div className="services-item pd-b">
                      <img src="img/services/service-icon-4.png" alt="" />
                      <h4>24/7 Support</h4>
                      <p>
                        We're committed to providing exceptional customer
                        service. Our dedicated support team is available for
                        24/7{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="classes-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title"></div>
            </div>
          </div>
          <div className="row classes-slider owl-carousel">
            <div className="col-lg-4">
              <div
                className="single-class-item set-bg"
                data-setbg="img/classes/classes-1.jpg"
              >
                <div className="si-text">
                  <h4>Employee Manage</h4>
                  <span>
                    <i className="fa fa-user"></i> Ryan Knight
                  </span>
                </div>
              </div>
              <div
                className="single-class-item set-bg"
                data-setbg="img/classes/classes-4.jpg"
              >
                <div className="si-text">
                  <h4>Karate</h4>
                  <span>
                    <i className="fa fa-user"></i> Kevin McCormick
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="single-class-item set-bg"
                data-setbg="img/classes/classes-2.jpg"
              >
                <div className="si-text">
                  <h4>Running</h4>
                  <span>
                    <i className="fa fa-user"></i> Randy Rivera
                  </span>
                </div>
              </div>
              <div
                className="single-class-item set-bg"
                data-setbg="img/classes/classes-5.jpg"
              >
                <div className="si-text">
                  <h4>Dance</h4>
                  <span>
                    <i className="fa fa-user"></i> Russell Lane
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="single-class-item set-bg"
                data-setbg="img/classes/classes-3.jpg"
              >
                <div className="si-text">
                  <h4>Personal Training</h4>
                  <span>
                    <i className="fa fa-user"></i> Cole Robertson
                  </span>
                </div>
              </div>
              <div
                className="single-class-item set-bg"
                data-setbg="img/classes/classes-6.jpg"
              >
                <div className="si-text">
                  <h4>Track Growth</h4>
                  <span>
                    <i className="fa fa-user"></i> Ryan Scott
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="single-class-item set-bg"
                data-setbg="img/classes/classes-7.jpg"
              >
                <div className="si-text">
                  <h4>Personal Training</h4>
                  <span>
                    <i className="fa fa-user"></i> Cole Robertson
                  </span>
                </div>
              </div>
              <div
                className="single-class-item set-bg"
                data-setbg="img/classes/classes-8.jpg"
              >
                <div className="si-text">
                  <h4>Track Growth</h4>
                  <span>
                    <i className="fa fa-user"></i> Ryan Scott
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trainer-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Our Team</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-trainer-item">
                <img src="img/trainer/trainer-1.jpg" alt="" />
                <div className="trainer-text">
                  <h5>Karan Tiwari</h5>
                  <span>Founder</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-trainer-item">
                <img src="img/trainer/cto-img.jpg" alt="" />
                <div className="trainer-text">
                  <h5>Shubhanker Tiwari</h5>
                  <span>CTO</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-trainer-item">
                <img src="img/trainer/business-dev.jpg" alt="" />
                <div className="trainer-text">
                  <h5>Akasksha Tiwari</h5>
                  <span>Business Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="testimonial-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Our clients</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="testimonial-slider owl-carousel">
                <div className="testimonial-item">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </p>
                  <div className="ti-pic">
                    <img src="img/testimonial/testimonial-1.jpg" alt="" />
                    <div className="quote">
                      <img src="img/testimonial/quote-left.png" alt="" />
                    </div>
                  </div>
                  <div className="ti-author">
                    <h4>Patrick Cortez</h4>
                    <span>Leader</span>
                  </div>
                </div>
                <div className="testimonial-item">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </p>
                  <div className="ti-pic">
                    <img src="img/testimonial/testimonial-1.jpg" alt="" />
                    <div className="quote">
                      <img src="img/testimonial/quote-left.png" alt="" />
                    </div>
                  </div>
                  <div className="ti-author">
                    <h4>Patrick Cortez</h4>
                    <span>Leader</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="banner-section set-bg" data-setbg="img/banner-bg.jpg">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-text">
                <h2>MANAGE YOUR TRAINERS EFFICIENTLY</h2>
                <p>
                  Simplify trainer management, streamline scheduling, track
                  progress, and enhance communication for improved productivity
                  and performance.
                </p>
                <Link to={"/signup"} className="primary-btn">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <img src="img/banner-person.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="membership-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>MEMBERSHIP PLANS</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="membership-item">
                <div className="mi-title">
                  <h4>Basic</h4>
                  <div className="triangle"></div>
                </div>
                <h2 className="mi-price">Free</h2>
                <ul>
                  <li>
                    <p>Duration</p>
                    <span>12 months</span>
                  </li>
                  <li>
                    <p>Employee Management</p>
                    <span>Yes</span>
                  </li>
                  <li>
                    <p>Members Attendance</p>
                    <span>No</span>
                  </li>
                  <li>
                    <p>SMS Alert</p>
                    <span>No</span>
                  </li>
                </ul>
                <button
                  className="primary-btn membership-btn"
                  onClick={() => navigate("/login")}
                >
                  Start Now
                </button>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="membership-item">
                <div className="mi-title">
                  <h4>Standard</h4>
                  <div className="triangle"></div>
                </div>
                <h2 className="mi-price">
                  $1.9<span>/M</span>
                </h2>
                <ul>
                  <li>
                    <p>Duration</p>
                    <span>12 months</span>
                  </li>
                  <li>
                    <p>Employee Management</p>
                    <span>Yes</span>
                  </li>
                  <li>
                    <p>Members Attendance</p>
                    <span>No</span>
                  </li>
                  <li>
                    <p>SMS Alert</p>
                    <span>No</span>
                  </li>
                </ul>
                <button
                  className="primary-btn membership-btn"
                  onClick={() => makePayment("standard", 1.9)}
                >
                  Coming Soon...
                </button>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="membership-item">
                <div className="mi-title">
                  <h4>Premium</h4>
                  <div className="triangle"></div>
                </div>
                <h2 className="mi-price">
                  $3.9<span>/M</span>
                </h2>
                <ul>
                  <li>
                    <p>Duration</p>
                    <span>12 months</span>
                  </li>
                  <li>
                    <p>Employee Management</p>
                    <span>Yes</span>
                  </li>
                  <li>
                    <p>Members Attendance</p>
                    <span>Yes</span>
                  </li>
                  <li>
                    <p>SMS Alert</p>
                    <span>Yes</span>
                  </li>
                </ul>
                <button
                  className="primary-btn membership-btn"
                  onClick={() => makePayment("premium", 3.9)}
                >
                  Coming Soon...
                </button>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="membership-item">
                <div className="mi-title">
                  <h4>Executive</h4>
                  <div className="triangle"></div>
                </div>
                <h2 className="mi-price">
                  $7.9<span>/M</span>
                </h2>
                <ul>
                  <li>
                    <p>Duration</p>
                    <span>12 months</span>
                  </li>
                  <li>
                    <p>Employee Management</p>
                    <span>Yes</span>
                  </li>
                  <li>
                    <p>Members Attendance</p>
                    <span>Yes</span>
                  </li>
                  <li>
                    <p>SMS Alert</p>
                    <span>Yes</span>
                  </li>
                </ul>
                <button
                  className="primary-btn membership-btn"
                  onClick={() => makePayment("executive", 7.9)}
                >
                  Coming Soon...
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="register-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="register-text">
                <div className="section-title">
                  <h2>Enqiure Us</h2>
                  <p>
                    Unlock Your First Year of Premium Gym Membership—Absolutely
                    FREE! Experience All the Perks Today!
                  </p>
                </div>
                <form action="#" className="register-form">
                  <div className="row">
                    <div className="col-lg-6">
                      <label for="name">First Name</label>
                      <input type="text" id="name" />
                    </div>
                    <div className="col-lg-6">
                      <label for="email">Your email address</label>
                      <input type="text" id="email" />
                    </div>
                    <div className="col-lg-6">
                      <label for="last-name">Last Name</label>
                      <input type="text" id="last-name" />
                    </div>
                    <div className="col-lg-6">
                      <label for="mobile">Mobile No*</label>
                      <input type="text" id="mobile" />
                    </div>
                  </div>
                  <button type="submit" className="register-btn">
                    Get Started
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="register-pic">
                <img src="img/register-pic.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="footer-banner-item set-bh"
                data-setbg="img/banner-bg.jpg"
                // data-setbg="../images/img/footer-banner/footer-banner-1.jpg"
              >
                <span>New member</span>
                <h2>Generate INVOICE</h2>
                <p>
                  For First 12 months You Can Enjoy All Features with Zero Costs
                </p>
                <Link to={"/signup"} className="primary-btn">
                  Sign-up Today
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="footer-banner-item set-bh1"
                data-setbg="./kimage/fb1.jpg"
              >
                <Link to={"/contact"}>
                  <span>Track Membership Expiry</span>
                </Link>
                <h2>+1 (548) 333-2060</h2>
                <p>
                  If you entrust us with your journey, the depths of darkness
                  will not disappoint
                </p>
                <Link to={"/login"} className="primary-btn">
                  Member-SHIP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />
      <ToastContainer />
    </div>
  );
};

export { Home };



                    // The First 30 Day Trial Is Completely Free With The Teacher

                    // <section className="latest-blog-section spad">
                    //   <div className="container">
                    //     <div className="row">
                    //       <div className="col-lg-12">
                    //         <div className="section-title">
                    //           <h2>Latest Blog</h2>
                    //         </div>
                    //       </div>
                    //     </div>
                    //     <div className="row">
                    //       <div className="col-lg-4 col-md-6">
                    //         <div className="single-blog-item">
                    //           <img src="img/blog/blog-1.jpg" alt="" />
                    //           <div className="blog-widget">
                    //             <div className="bw-date">February 17, 2019</div>
                    //             <a href="#" className="tag">
                    //               #Gym
                    //             </a>
                    //           </div>
                    //           <h4>
                    //             <a href="#">
                    //               10 States At Risk of Rural Hospital Closures
                    //             </a>
                    //           </h4>
                    //         </div>
                    //       </div>
                    //       <div className="col-lg-4 col-md-6">
                    //         <div className="single-blog-item">
                    //           <img src="img/blog/blog-2.jpg" alt="" />
                    //           <div className="blog-widget">
                    //             <div className="bw-date">February 17, 2019</div>
                    //             <a href="#" className="tag">
                    //               #Sport
                    //             </a>
                    //           </div>
                    //           <h4>
                    //             <a href="#">
                    //               Diver who helped save Thai soccer team
                    //             </a>
                    //           </h4>
                    //         </div>
                    //       </div>
                    //       <div className="col-lg-4 col-md-6">
                    //         <div className="single-blog-item">
                    //           <img src="img/blog/blog-3.jpg" alt="" />
                    //           <div className="blog-widget">
                    //             <div className="bw-date">February 17, 2019</div>
                    //             <a href="#" className="tag">
                    //               #Body
                    //             </a>
                    //           </div>
                    //           <h4>
                    //             <a href="#">
                    //               Man gets life in prison for stabbing
                    //             </a>
                    //           </h4>
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </section>;