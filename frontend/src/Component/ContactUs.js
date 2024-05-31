import { useState } from "react";
import { HomeFooter } from "./HomeFooter";
import { HomeHeader } from "./HomeHeader";

const ContactUs = ()=>{
    const[show,setShow] = useState(false);
    return(
        <div onClick={()=>{setShow(false)}}>
    <HomeHeader show={show} setShow={setShow}/>
    <section class="breadcrumb-section set-bg">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text">
                        <h2>Contact</h2>
                        <div class="breadcrumb-option">
                            <a href="./index.html"><i class="fa fa-home"></i> Home</a>
                            <span>Contact</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="map">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11544.4812035225!2d-80.5344452!3d43.4812305!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c0bca24482fd9%3A0xd634b53304151d32!2sMaskottchen%20Technology!5e0!3m2!1sen!2sca!4v1643073485155!5m2!1sen!2sca"/>
    
        {/* <img src="img/icon/location.png" alt=""/> */}
    </div>
    <section class="contact-section spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="contact-info">
                        <h4>Contacts Us</h4>
                        <div class="contact-address">
                            <div class="ca-widget">
                                <div class="cw-icon">
                                    <img src="img/icon/icon-1.png" alt=""/>
                                </div>
                                <div class="cw-text">
                                    <h5>Our Location</h5>
                                    <p > 51 Cardill Cres Waterloo, Kitchener, Canada</p>
                                </div>
                            </div>
                            <div class="ca-widget">
                                <div class="cw-icon">
                                    <img src="img/icon/icon-2.png" alt=""/>
                                </div>
                                <div class="cw-text">
                                    <h5>Phone:</h5>
                                    <p> +1 548-333-2060</p>
                                </div>
                            </div>
                            <div class="ca-widget">
                                <div class="cw-icon">
                                    <img src="img/icon/icon-3.png" alt=""/>
                                </div>
                                <div class="cw-text">
                                    <h5>Mail</h5>
                                    <p>info@membersmonitor.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="contact-form">
                        <h4>Leave A Comment</h4>
                        <form action="#">
                            <div class="row">
                                <div class="col-lg-6">
                                    <input type="text" placeholder="Your name"/>
                                </div>
                                <div class="col-lg-6">
                                    <input type="text" placeholder="Your email"/>
                                </div>
                                <div class="col-lg-12">
                                    <textarea placeholder="Your messages"></textarea>
                                    <button type="submit">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <HomeFooter/>
    </div>
    )
}

export {ContactUs};