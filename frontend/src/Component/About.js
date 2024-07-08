import { useState } from "react";
import { HomeFooter } from "./HomeFooter";

const { HomeHeader } = require("./HomeHeader");

const About = () => {
    const [show,setShow] = useState(false);
  return (
    <div onClick={()=>{setShow(false)}}>
    <HomeHeader show={show} setShow={setShow}/>
    <section class="breadcrumb-section set-bg" data-setbg="img/breadcrumb/hero-bg.jpg">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text">
                        <h2>About</h2>
                        <div class="breadcrumb-option">
                            <a href="./index.html"><i class="fa fa-home"></i> Home</a>
                            <span>About</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="about-section about-page spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="about-pic">
                        <img src="img/about-pic.jpg" alt=""/>
                        <a href="https://www.youtube.com/watch?v=SlPhMPnQ58k" class="play-btn video-popup">
                            <img src="img/play.png" alt=""/>
                        </a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about-text">
                        <h2>Story About Us</h2>
                        <p class="first-para"> Welcome to Members Monitor, your ultimate solution for seamless gym member management.</p>
                        <p class="second-para">At Members Monitor, we're passionate about revolutionizing the way gyms handle their memberships. Our cutting-edge software empowers gym owners and managers to effortlessly manage their members, streamline operations, and enhance the overall gym experience.</p>
                        <img src="img/about-signature.png" alt=""/>
                        <div class="at-author">
                            <h4>Shubhanker Tiwari</h4>
                            <span>CEO - Founder</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="about-counter">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="about-counter-text">
                        <div class="single-counter">
                            <h1 class="counter-num count">98</h1>
                            <p>Programs</p>
                        </div>
                        <div class="single-counter">
                            <h1 class="counter-num count">14</h1>
                            <p>Locations</p>
                        </div>
                        <div class="single-counter">
                            <h1 class="counter-num count">50</h1>
                            <span>k+</span>
                            <p>Members</p>
                        </div>
                        <div class="single-counter">
                            <h1 class="counter-num count">34</h1>
                            <p>Coaches</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section class="gym-award spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="award-text">
                        <h2>What Sets Us Apart:</h2>
                        <p>Innovative Solutions: We pride ourselves on offering innovative software solutions specifically tailored to the needs of gym owners and managers. Our platform is designed to simplify member management tasks, from sign-ups and renewals to class scheduling and payment processing.</p>
                      
                    </div>
                </div>
                <div class="col-lg-4">
                    <img src="img/award.jpg" alt=""/>
                </div>
            </div>
        </div>
    </section>
    <section class="banner-section set-bg" data-setbg="img/banner-bg.jpg">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="banner-text">
                        <h2>Get training today</h2>
                        <p>Gimply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry’s standard.</p>
                        <a href="#" class="primary-btn banner-btn">Contact Now</a>
                    </div>
                </div>
                <div class="col-lg-5">
                    <img src="img/banner-person.png" alt=""/>
                </div>
            </div>
        </div>
    </section>
    <section class="trainer-section about-trainer spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <h2>EXPERT TRAINERS</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6">
                    <div class="single-trainer-item">
                        <img src="img/trainer/about-trainer-1.jpg" alt=""/>
                        <div class="trainer-text">
                            <h5>Patrick Cortez</h5>
                            <span>Leader</span>
                            <p>non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                                voluptatem.</p>
                            <div class="trainer-social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-trainer-item">
                        <img src="img/trainer/about-trainer-2.jpg" alt=""/>
                        <div class="trainer-text">
                            <h5>Gregory Powers</h5>
                            <span>Gym coach</span>
                            <p>non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                                voluptatem.</p>
                            <div class="trainer-social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-trainer-item">
                        <img src="img/trainer/about-trainer-3.jpg" alt=""/>
                        <div class="trainer-text">
                            <h5>Walter Wagner</h5>
                            <span>Dance trainer</span>
                            <p>non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                                voluptatem.</p>
                            <div class="trainer-social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="footer-banner">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <div class="footer-banner-item set-bg" data-setbg="img/footer-banner/footer-banner-1.jpg">
                        <span>New member</span>
                        <h2>7 days for free</h2>
                        <p>Complete the training sessions with us, surely you will be happy</p>
                        <a href="#" class="primary-btn">Get Started</a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="footer-banner-item set-bg" data-setbg="img/footer-banner/footer-banner-2.jpg">
                        <span>contact us</span>
                        <h2>09 746 204</h2>
                        <p>If you trust us on your journey they dark sex does not disappoint you!</p>
                        <a href="#" class="primary-btn">Get Started</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <HomeFooter/>
</div>
  );
};
export { About };
