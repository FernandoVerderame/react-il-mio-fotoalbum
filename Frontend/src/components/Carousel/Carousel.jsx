import axios from "../../utils/axiosClient.js";
import CarouselPost from '../Carousel/CarouselPost/CarouselPost.jsx';
import { useState, useEffect } from 'react';
import {
    RiArrowLeftWideFill as Prev,
    RiArrowRightWideFill as Next
} from "react-icons/ri";
import carouselStyle from './Carousel.module.scss'

const Carousel = () => {

    const [activePost, setActivePost] = useState(0);

    // useState delle foto
    const [images, setImages] = useState([]);

    // Fetch delle foto
    const fetchImages = async () => {
        const res = await axios.get(`/photos`);
        const newImages = res.data.data;
        setImages(newImages);
    }

    useEffect(() => {
        fetchImages();
    }, []);

    const postsCarousel = images;

    const prevClick = () => {
        setActivePost(currentIndex =>
            currentIndex === 0 ? postsCarousel.length - 1 : currentIndex - 1
        );
    }

    const nextClick = () => {
        setActivePost(currentIndex =>
            currentIndex === postsCarousel.length - 1 ? 0 : currentIndex + 1
        );
    }

    // Autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            nextClick();
        }, 3000);

        return () => clearInterval(interval);
    }, [activePost]);

    return (
        <section id="carousel" className="d-flex justify-content-center align-items-center flex-column">

            <h2 className="mb-5 text-black h1">Alcuni dei migliori scatti</h2>

            {/* Carosello dei Posts */}
            <div className={carouselStyle.carousel}>

                {/* Prev Button */}
                <button className={carouselStyle.btn}>
                    <Prev
                        onClick={prevClick}
                    />
                </button>

                {/* Post del carosello */}
                {postsCarousel.map((pc, i) => (
                    <CarouselPost
                        key={pc.id}
                        image={pc.image}
                        isActive={activePost === i}
                    />
                ))}

                {/* Next Button */}
                <button className={carouselStyle.btn}>
                    <Next
                        onClick={nextClick}
                    />
                </button>
            </div>

        </section>
    );
}

export default Carousel;