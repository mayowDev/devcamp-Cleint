
// @ts-ignore
import React, { useState} from 'react';
import {useHistory} from "react-router-dom";
// import useInfiniteScroll from 'react-infinite-scroll-hook';
// import Card from "../../components/Card";
import courseThumbnail from '../../assets/images/coursesThumbnails/react-thumbnail.jpg'
// import {H1, H2, H3, H4} from '../../components/Typography'
import Spinner from '../../components/Spinner';
import ScrollAnimation from '../../components/ScrollAnimation/ScrollAnimation';
// import {paginate} from '../../utils/paginate'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Courses = (props) => {
    const history = useHistory()
    const { courses, isLoading,} = props;

    const handleCourseClick = (courseId) => {
        history.push(`/courses/${courseId}`)
    };
    const handleAddToCart = () => {
        history.push('/cart')
    }

    function Arrow(props) {
        let className = props.type === "next" ? "nextArrow" : "prevArrow";
        className += " arrow";
        const char = props.type === "next" ? 
            <span className="next position-top right-0">&#10095;</span>:
            <span className="prev position-top left-0">&#10094;</span>
        return (
            <span className={className} onClick={props.onClick}>{char}</span>
        );
    }
    const settings = {
        // dots: true,
        accessibility: true,
        arrows: true,
        // infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <Arrow type="next" />,
        prevArrow: <Arrow type="prev" />
        // customPaging: customPaging
        // appendDots: appendDots
    };
    const renderCourses = () =>
    // [0,1,2,3,4,5,6,7,8,9]
        courses&&courses.map((course) => (
            <div key={course.id} onClick={()=>handleCourseClick(course.id)} className="courses__card--item" data-aos="fade-up" data-aos-duration="500">
                <div className="content">
                    <img className="thumbnail" src={courseThumbnail} alt="course-img" />
                    <h3 className='big'>{course.title}</h3>
                    <p className="teacher">Stephent graider</p>
                    <div className="review">5 reviews</div>
                    <div className="price">${course.price}.99</div>
                </div>
                <div onClick={e=>e.stopPropagation()}  className="content-hover">
                    <h3 className='big'>{course.title}</h3>
                    <p className="teacher">Stephent graider</p>
                    <div className="review">5 reviews</div>
                    <div className="price">${course.price}.99</div>
                    <div className="cart-btn">
                        <button onClick={handleAddToCart} className="btn">Add to Cart</button>
                    </div>

                </div>
            </div>
        ));
    return (
        <ScrollAnimation>
            <div className="courses">
                <div  className="courses__hero">
                    <div className="courses__hero--search-box">
                        <h2>Learn from the best</h2>
                        <p>Real-world experts teaching real-world skills from $12.99 — sale ends today</p>
                        <input placeholder="What do you want to learn?" type="text" />
                    </div>
                </div>
                <div className="courses__title">
                    <h1 className='big'>Top courses in Web Development</h1>
                </div>
                {
                isLoading &&!courses ?
                    <Spinner type="cover" />
                    :
                    <Slider {...settings}>{renderCourses()}</Slider>
                }
            </div>
        </ScrollAnimation>
    )
};

export default Courses;
