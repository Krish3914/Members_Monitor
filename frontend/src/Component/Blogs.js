import { useState } from "react";
import { HomeFooter } from "./HomeFooter";

const { HomeHeader } = require("./HomeHeader");

const Blogs = () => {
    const[show,setShow] = useState(false);
  return (
    <div onClick={()=>{setShow(false)}}>
    <HomeHeader show={show} setShow={setShow}/>
    <section class="breadcrumb-section set-bg" data-setbg="img/breadcrumb/hero-bg.jpg">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text">
                        <h2>Blog</h2>
                        <div class="breadcrumb-option">
                            <a href="./index.html"><i class="fa fa-home"></i> Home</a>
                            <span>Blog</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="blog-section spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6">
                    <div class="single-blog-item">
                        <img src="img/blog/blog-1.jpg" alt=""/>
                        <div class="blog-widget">
                            <div class="bw-date">February 17, 2019</div>
                            <a href="#" class="tag">#Gym</a>
                        </div>
                        <h4><a href="./blog-details.html">10 States At Risk of Rural Hospital Closures</a></h4>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-blog-item">
                        <img src="img/blog/blog-2.jpg" alt=""/>
                        <div class="blog-widget">
                            <div class="bw-date">February 17, 2019</div>
                            <a href="#" class="tag">#Sport</a>
                        </div>
                        <h4><a href="./blog-details.html">Diver who helped save Thai soccer team</a></h4>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-blog-item">
                        <img src="img/blog/blog-3.jpg" alt=""/>
                        <div class="blog-widget">
                            <div class="bw-date">February 17, 2019</div>
                            <a href="#" class="tag">#Body</a>
                        </div>
                        <h4><a href="./blog-details.html">Man gets life in prison for stabbing</a></h4>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-blog-item">
                        <img src="img/blog/blog-4.jpg" alt=""/>
                        <div class="blog-widget">
                            <div class="bw-date">February 17, 2019</div>
                            <a href="#" class="tag">#Running</a>
                        </div>
                        <h4><a href="./blog-details.html">Russia's first male synchronised swimmer</a></h4>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-blog-item">
                        <img src="img/blog/blog-5.jpg" alt=""/>
                        <div class="blog-widget">
                            <div class="bw-date">February 17, 2019</div>
                            <a href="#" class="tag">#Gym</a>
                        </div>
                        <h4><a href="./blog-details.html">NYC measles vaccination order prevails in court</a></h4>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-blog-item">
                        <img src="img/blog/blog-6.jpg" alt=""/>
                        <div class="blog-widget">
                            <div class="bw-date">February 17, 2019</div>
                            <a href="#" class="tag">#Sport</a>
                        </div>
                        <h4><a href="./blog-details.html">The Week in Pictures: April 11 - 18</a></h4>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-blog-item">
                        <img src="img/blog/blog-7.jpg" alt=""/>
                        <div class="blog-widget">
                            <div class="bw-date">February 17, 2019</div>
                            <a href="#" class="tag">#Gym</a>
                        </div>
                        <h4><a href="./blog-details.html">Man who pretended to be faces new charges</a></h4>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-blog-item">
                        <img src="img/blog/blog-8.jpg" alt=""/>
                        <div class="blog-widget">
                            <div class="bw-date">February 17, 2019</div>
                            <a href="#" class="tag">#Body</a>
                        </div>
                        <h4><a href="./blog-details.html">10 States At Risk of Rural Hospital Closures</a></h4>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-blog-item">
                        <img src="img/blog/blog-9.jpg" alt=""/>
                        <div class="blog-widget">
                            <div class="bw-date">February 17, 2019</div>
                            <a href="#" class="tag">#Gym</a>
                        </div>
                        <h4><a href="./blog-details.html">Lenny Kravitz gives Arch Digest a look inside</a></h4>
                    </div>
                </div>
            </div>
        </div>
    </section>
   <HomeFooter/>
</div>
  );
};
export { Blogs };
